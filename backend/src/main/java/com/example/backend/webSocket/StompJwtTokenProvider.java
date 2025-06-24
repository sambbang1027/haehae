package com.example.backend.webSocket;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

@Component
public class StompJwtTokenProvider {

    private final String secret;

    public StompJwtTokenProvider() {
        Dotenv dotenv = Dotenv.configure()
                .directory("C:/haehae/backend") // 또는 경로 확인
                .filename(".env")
                .load();

        this.secret = dotenv.get("JWT_SECRET");
    }

    public String getUserId(String token) {
        return Jwts.parser()
                .setSigningKey(secret.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
