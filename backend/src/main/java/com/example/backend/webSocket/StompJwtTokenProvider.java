package com.example.backend.webSocket;

import com.example.backend.security.JwtTokenProvider;
import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;


@Component
public class StompJwtTokenProvider {

    @Autowired
    private  JwtTokenProvider jwtTokenProvider;

    @Autowired
    public StompJwtTokenProvider(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }


//    private final String secret;
//
//    public StompJwtTokenProvider() {
//        Dotenv dotenv = Dotenv.configure()
//                .directory("C:/haehae/backend") // 또는 경로 확인
//                .filename(".env")
//                .load();
//        this.secret = dotenv.get("JWT_SECRET");
//    }


    public String getUserId(String token) {
        String secret = jwtTokenProvider.getSecret();
        return Jwts.parser()
                .setSigningKey(secret.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}