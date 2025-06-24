package com.example.backend.webSocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class OAuthTokenVerifier {

    private final RestTemplate restTemplate;
    private final StompJwtTokenProvider jwtProvider;

    @Autowired
    public OAuthTokenVerifier(RestTemplate restTemplate, StompJwtTokenProvider jwtProvider) {
        this.restTemplate = restTemplate;
        this.jwtProvider = jwtProvider;
    }

    public String getUserIdFromAccessToken(String token) {
        try {
            if (isKakaoToken(token)) {
                return getKakaoUserId(token);
            } else if (isGoogleToken(token)) {
                return getGoogleUserId(token);
            }
        } catch (Exception e) {
            System.out.println("❌ OAuth 토큰 검증 실패 형님!!!");
        }

        // fallback: JWT에서 userId 추출
        return jwtProvider.getUserId(token);
    }

    private boolean isKakaoToken(String token) {
        return token.length() < 1000; // 예시: 짧고 ya29 안 붙은 토큰이면 Kakao
    }

    private boolean isGoogleToken(String token) {
        return token.startsWith("ya29."); // Google OAuth token은 ya29로 시작
    }

    private String getKakaoUserId(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                entity,
                Map.class
        );

        Map<String, Object> body = response.getBody();
        return (body != null && body.get("id") != null) ? String.valueOf(body.get("id")) : null;
    }

    private String getGoogleUserId(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                HttpMethod.GET,
                entity,
                Map.class
        );

        Map<String, Object> body = response.getBody();
        return (body != null && body.get("sub") != null) ? String.valueOf(body.get("sub")) : null;
    }
}
