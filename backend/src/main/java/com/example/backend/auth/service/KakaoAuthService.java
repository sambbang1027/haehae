package com.example.backend.auth.service;

import com.example.backend.auth.dto.KaKaoResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


@Service
public class KakaoAuthService {
    private final WebClient webClient;

    public KakaoAuthService(WebClient.Builder builder){
        this.webClient = builder
                .baseUrl("https://kapi.kakao.com")
                .build();
    }

    public Mono<KaKaoResponse> getKakaoProfile(String accessToken){
        return webClient.get()
                .uri("/v2/user/me")
                .header(HttpHeaders.AUTHORIZATION, "Bearer "  + accessToken)
                .retrieve()
                .onStatus(status -> status.is4xxClientError(), response ->
                   Mono.error(new RuntimeException("4xx 에러 발생"))
                )
                .onStatus(status -> status.is5xxServerError(), response ->
                  Mono.error(new RuntimeException("5xx 에러 발생"))
                )
                .bodyToMono(KaKaoResponse.class);
    }
}
