package com.example.backend.webSocket;


import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import org.slf4j.Logger;


@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);
    @EventListener
    public void handleSessionConnectedEvent(SessionConnectedEvent  event) {
        logger.info("WebSocket Session Connected: " + event.getMessage());
    }

    @EventListener
    public void handleSessionDisconnectEvent(SessionDisconnectEvent event) {
        logger.info("WebSocket Session Disconnected: " + event.getSessionId());
    }
}
