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
            String authUserId = null;
                if (getKakaoUserId(token) != null) {
                    authUserId =  getKakaoUserId(token);
                }else if (getGoogleUserId(token) != null) {
                    authUserId =  getGoogleUserId(token);
                }else {
                    authUserId =  jwtProvider.getUserId(token);
                }
            return authUserId;
    }

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
        }catch (Exception e){
            return null;
        }

    }

    private String getGoogleUserId(String token) {
        try {
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
        }catch (Exception e){
            return  null;
        }
    }
}
