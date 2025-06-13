package com.example.backend.config;

import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    private final String secret = "secret-key";

    public String getUserId(String token) {
        return Jwts.parser()
                .setSigningKey(secret.getBytes())
                .parseClaimsJws(token)
                .getBody()
                .getSubject(); // 혹은 .get("id", String.class)
    }
}
