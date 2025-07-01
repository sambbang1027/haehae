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
        String authUserId = "";
        try {
            if (getKakaoUserId(token) != null) {
                authUserId = getKakaoUserId(token);
            }
//            else if (getGoogleUserId(token) != null) {
//                System.out.println("isGoogle:" +  token);
//                authUserId = getGoogleUserId(token);
//            }
            else {
                // 직접 발급한 JWT 토큰이면 여기서만 추출
                System.out.println("isToken:" +  token);
                authUserId = jwtProvider.getUserId(token);
            }
        } catch (Exception e) {
            System.out.println("❌ OAuth 토큰 검증 실패 형님!!!");
            System.out.println("exception:" + e);
            return null; // 실패 시 무조건 null 리턴!!!
        }
        return authUserId;
    }

//    private boolean isKakaoToken(String token) {
//        return token.length() < 1000; // 예시: 짧고 ya29 안 붙은 토큰이면 Kakao
//    }
//
//    private boolean isGoogleToken(String token) {
//        return token.startsWith("ya29."); // Google OAuth token은 ya29로 시작
//    }

    private String getKakaoUserId(String token) {
        try {
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
        } catch (Exception e) {
            return null;
        }
    }

//    private String getGoogleUserId(String token) {
//        HttpHeaders headers = new HttpHeaders();
//        headers.setBearerAuth(token);
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//
//        HttpEntity<String> entity = new HttpEntity<>(headers);
//
//        ResponseEntity<Map> response = restTemplate.exchange(
//                "https://www.googleapis.com/oauth2/v3/userinfo",
//                HttpMethod.GET,
//                entity,
//                Map.class
//        );
//
//        Map<String, Object> body = response.getBody();
//        return (body != null && body.get("sub") != null) ? String.valueOf(body.get("sub")) : null;
//    }
}
