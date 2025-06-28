package com.example.backend.security;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.sql.Timestamp;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final String secret;
    private final long accessTokenExpiration;
    private final long refreshTokenExpiration;
    private final Key key;

    public JwtTokenProvider(){
        // env 파일 읽어오기
        Dotenv dotenv = Dotenv.load();

        this.secret = dotenv.get("JWT_SECRET");
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)); //secret -> key 변환
        this.accessTokenExpiration = Long.parseLong(dotenv.get("JWT_ACCESS_EXPIRATION","3600000"));
        this.refreshTokenExpiration = Long.parseLong(dotenv.get("JWT_REFRESH_EXPIRATION","1209600000"));

    }

    // getter
    public String getSecret() {
        return this.secret;
    }


    // accessToken 생성
    public String createAccessToken(Long userId){
        Date now = new Date();
        Date expiryDate = new Date(now.getTime()+accessTokenExpiration);

        return Jwts.builder()
                .setSubject(userId.toString())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

    }

    //refreshToken 생성
    public String createRefreshToken(Long userId){
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + refreshTokenExpiration);

        return Jwts.builder()
                .setSubject(userId.toString())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // token 유효성 체크
    public Boolean vaildateToken(String token){
        try{
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        }catch (SecurityException | MalformedJwtException e){
            System.out.println("Invalid JWT signature.");
        }catch (ExpiredJwtException e){
            System.out.println("Expired JWT token.");
        }catch (UnsupportedJwtException e){
            System.out.println("Unsupported JWT token");
        }catch (IllegalArgumentException e){
            System.out.println("JWT claims string is empty.");
        }
        return false;
        }

        // 토큰에서 userId 꺼내기
    public Long getUserIdFromToken(String token){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return Long.parseLong(claims.getSubject());
    }

    // 토큰 만료 시간 추출
    public Date getExpiration(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody().getExpiration();
    }
}

