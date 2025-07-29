package com.example.backend.exception;

public class PenaltyException extends RuntimeException {
   private final String message;
    public PenaltyException(String message) {
        super(message);
        this.message = message;
    }

    @Override
    public String getMessage() {
      return message;
    }
}
