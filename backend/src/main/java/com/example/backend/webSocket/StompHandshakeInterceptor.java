package com.example.backend.webSocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

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

        // 쿼리 파라미터에서 토큰 추출
        String token = null;
        if (request instanceof ServletServerHttpRequest) {
            ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
            token = servletRequest.getServletRequest().getParameter("token");
        }

        System.out.println("Token from query parameter: " + token);

        if (token == null || token.isEmpty()) {
            System.out.println("❌ 토큰 없음 형님!!!");
            return false;
        }

        String userId = tokenVerifier.getUserIdFromAccessToken(token);
        System.out.println("userId: " + userId);

        if (userId == null) {
            System.out.println("❌ 토큰 유효성 실패 형님!!!");
            return false;
        }

        attributes.put("userId", userId);
        System.out.println("✅ 인증 성공 - 유저 ID: " + userId + " 형님!!!");
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {
        // 필요 없으면 비워둬도 됨
    }
}
