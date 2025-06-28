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

        URI uri = request.getURI();
        String query = uri.getQuery();

        System.out.println(query);

       // List<String> authHeaders = request.getHeaders().get("Authorization");
        if (query == null || query.isEmpty()) {
            System.out.println("❌ 쿼리로 넘어온 토큰 없음");
            return false;
        }

       // String tokenHeader = authHeaders.get(0); // "Bearer eyJhbGciOi..."

        String token = null;
        String[] params = query.split("&");
         for(String param : params){
             if(param.startsWith("token")){
                 token = param.substring("token=".length());
                 break;
             }
         }

        if (token == null) {
            System.out.println("❌ token 안에 토큰이 없습니다. ");
            return false;
        }
        System.out.println("쿼리로 받은 토큰 : "+ token);
       // String token = tokenHeader.substring("Bearer ".length());
        String userId = tokenVerifier.getUserIdFromAccessToken(token);

        if (userId == null) {
            System.out.println("❌ 토큰 유효성 실패 형님!!!");
            return false;
        }

        attributes.put("userId", new StompPrincipal(userId));
        System.out.println("✅ 인증 성공 - 유저 ID: " + userId + " 형님!!!");
        return true;
    }


    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {
        if (exception == null) {
            System.out.println("✅ Handshake 성공, 연결 준비 완료!");
        } else {
            System.out.println("❌ Handshake 실패: " + exception.getMessage());
        }
    }
}