package com.example.backend.webSocket;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Component
public class OAuthTokenVerifier {

    private final WebClient kakaoClient;
    private final WebClient googleClient;
    private final StompJwtTokenProvider jwtProvider;

    public OAuthTokenVerifier(WebClient.Builder builder, StompJwtTokenProvider jwtProvider) {
        this.kakaoClient = builder.baseUrl("https://kapi.kakao.com").build();
        this.googleClient = builder.baseUrl("https://www.googleapis.com").build();
        this.jwtProvider = jwtProvider;
    }

    public String getUserIdFromAccessToken(String token) {
        if (isKakaoToken(token)) {
            return getKakaoUserId(token);
        } else if (isGoogleToken(token)) {
            return getGoogleUserId(token);
        } else {
            return jwtProvider.getUserId(token);
        }
    }

    private boolean isKakaoToken(String token) {
        // JWT 구조가 아님 (보통 Kakao는 access_token은 서명 구조가 없음)
        return token.startsWith("kakao_"); // 예시: 토큰 prefix로 구분하거나
    }

    private boolean isGoogleToken(String token) {
        return token.startsWith("ya29."); // Google OAuth 토큰은 ya29로 시작
    }

    private String getKakaoUserId(String token) {
        try {
            Map<String, Object> response = kakaoClient.get()
                    .uri("/v2/user/me")
                    .header("Authorization", "Bearer " + token)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                    .block();

            return String.valueOf(response.get("id"));
        } catch (Exception e) {
            return null;
        }
    }

    private String getGoogleUserId(String token) {
        try {
            Map<String, Object> response = googleClient.get()
                    .uri("/oauth2/v3/userinfo")
                    .header("Authorization", "Bearer " + token)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                    .block();

            return String.valueOf(response.get("sub")); // Google은 sub가 userId
        } catch (Exception e) {
            return null;
        }
    }
}

