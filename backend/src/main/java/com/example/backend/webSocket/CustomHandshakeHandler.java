package com.example.backend.webSocket;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

@Component
public class CustomHandshakeHandler extends DefaultHandshakeHandler {
    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler,
                                      Map<String, Object> attributes) {
        String userId = (String) attributes.get("userId");

        // 🔐 null 체크 확실히!
        if (userId == null || userId.isBlank()) {
            throw new IllegalArgumentException("userId is missing in WebSocket attributes");
        }
        System.out.println("✅ WebSocket userId: " + userId);

        return new StompPrincipal(userId); // Principal 구현체
    }
}
