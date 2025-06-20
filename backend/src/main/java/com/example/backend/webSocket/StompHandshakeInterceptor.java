package com.example.backend.webSocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.net.URI;
import java.util.List;
import java.util.Map;

@Component
public class StompHandshakeInterceptor implements HandshakeInterceptor {

    private final OAuthTokenVerifier tokenVerifier;

    @Autowired
    public StompHandshakeInterceptor(OAuthTokenVerifier tokenVerifier) {
        this.tokenVerifier = tokenVerifier;
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) {
        System.out.println("👉 [Interceptor] Handshake 시도됨 형님!!!");

        List<String> authHeaders = request.getHeaders().get("Authorization");

        if (authHeaders == null || authHeaders.isEmpty()) {
            System.out.println("❌ Authorization 헤더 없음 형님!!!");
            return false;
        }

        String tokenHeader = authHeaders.get(0); // "Bearer eyJhbGciOi..."

        if (!tokenHeader.startsWith("Bearer ")) {
            System.out.println("❌ Bearer 토큰 형식 아님 형님!!!");
            return false;
        }

        String token = tokenHeader.substring("Bearer ".length());
        String userId = tokenVerifier.getUserIdFromAccessToken(token);

        if (userId == null) {
            System.out.println("❌ 토큰 유효성 실패 형님!!!");
            return false;
        }

        attributes.put("user", new StompPrincipal(userId));
        System.out.println("✅ 인증 성공 - 유저 ID: " + userId + " 형님!!!");
        return true;
    }


    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {
        // 필요 없으면 비워둬도 됨
    }
}