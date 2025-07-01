//package com.example.backend.webSocket;
//
//import io.github.cdimascio.dotenv.Dotenv;
//import io.jsonwebtoken.Jwts;
//import org.springframework.stereotype.Component;
//
//import java.nio.charset.StandardCharsets;
//
//@Component
//public class StompJwtTokenProvider {
//
//    private final String secret;
//
//    public StompJwtTokenProvider() {
//        Dotenv dotenv = Dotenv.load();
//
//        this.secret = dotenv.get("JWT_SECRET");
//    }
//
//    public String getUserId(String token) {
//        return Jwts.parser()
//                .setSigningKey(secret.getBytes(StandardCharsets.UTF_8))
//                .parseClaimsJws(token)
//                .getBody()
//                .getSubject();
//    }
//}
package com.example.backend.webSocket;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys; // 추가
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key; // 추가

@Component
public class StompJwtTokenProvider {

    private final String secret;
    private final Key key; // Key 객체 추가

    public StompJwtTokenProvider() {
        Dotenv dotenv = Dotenv.load(); // JwtTokenProvider와 동일하게 Dotenv.load() 사용

        this.secret = dotenv.get("JWT_SECRET");
        System.out.println("StompJwtTokenProvider Secret: " + this.secret);
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)); // Key 생성 방식 통일
    }

    public String getUserId(String token) {
        return Jwts.parserBuilder() // Jwts.parser() 대신 parserBuilder() 사용
                .setSigningKey(key) // secret.getBytes() 대신 Key 객체 사용
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}