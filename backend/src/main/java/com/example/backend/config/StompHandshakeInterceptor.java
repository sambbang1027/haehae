package com.example.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

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

        List<String> authHeaders = request.getHeaders().get("Authorization");
        if (authHeaders == null || authHeaders.isEmpty()) return false;

        String token = authHeaders.get(0).replace("Bearer ", "");
        String userId = tokenVerifier.getUserIdFromAccessToken(token);

        if (userId == null) return false; // 인증 실패 시 연결 차단

        attributes.put("userId", userId);
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {
        // 필요 없으면 비워둬도 됨
    }
}

