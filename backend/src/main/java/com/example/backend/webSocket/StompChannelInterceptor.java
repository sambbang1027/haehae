package com.example.backend.webSocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.*;
import org.springframework.messaging.simp.stomp.*;
import org.springframework.messaging.support.*;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.*;

@Component
@RequiredArgsConstructor
public class StompChannelInterceptor implements ChannelInterceptor {

    private final OAuthTokenVerifier tokenVerifier;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        System.out.println("🔥 [Interceptor] preSend 진입 형님!!!");

        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (accessor != null) {
            System.out.println("💬 Command = " + accessor.getCommand()); // STOMP 명령 확인
        }

        // ↓ 이 밑에 기존 토큰 검증 및 Principal 설정 로직 계속 유지해도 됩니다 형님!!!
        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
            String tokenHeader = accessor.getFirstNativeHeader("Authorization");
            System.out.println("🧾 Authorization 헤더 = " + tokenHeader);

            if (tokenHeader == null || !tokenHeader.startsWith("Bearer ")) {
                throw new IllegalArgumentException("❌ Authorization 헤더가 없거나 형식이 잘못됨 형님!!!");
            }

            String token = tokenHeader.substring("Bearer ".length());
            String userId = tokenVerifier.getUserIdFromAccessToken(token);

            if (userId == null) {
                throw new IllegalArgumentException("❌ JWT 유효성 검증 실패 형님!!!");
            }

            accessor.setUser(new StompPrincipal(userId));
            System.out.println("✅ STOMP 인증 성공 - userId: " + userId + " 형님!!!");
        }

        return message;
    }
}

