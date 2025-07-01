package com.example.backend.webSocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final StompHandshakeInterceptor handshakeInterceptor;
    private final CustomHandshakeHandler customHandshakeHandler;
    private final StompChannelInterceptor stompChannelInterceptor;

    public WebSocketConfig(StompHandshakeInterceptor handshakeInterceptor,
                           CustomHandshakeHandler customHandshakeHandler, StompChannelInterceptor stompChannelInterceptor) {
        this.handshakeInterceptor = handshakeInterceptor;
        this.customHandshakeHandler = customHandshakeHandler;
        this.stompChannelInterceptor = stompChannelInterceptor;
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/app");
        config.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .setHandshakeHandler(customHandshakeHandler)
                .addInterceptors(handshakeInterceptor)
                ;
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompChannelInterceptor);
    }
}
