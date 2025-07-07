package com.example.backend.exception;

public class RewardException extends RuntimeException {
    private final String message;
    public RewardException(String message) {
        super(message);
        this.message = message;
    }


    @Override
    public String getMessage() {
        return message;
    }
}
