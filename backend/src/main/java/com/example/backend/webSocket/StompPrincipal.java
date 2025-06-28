package com.example.backend.webSocket;

import java.security.Principal;

public class StompPrincipal implements Principal {
    private final String name;

    public StompPrincipal(String name) {
        System.out.println("Stomp 객체 생성 : " + name);
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }
}
