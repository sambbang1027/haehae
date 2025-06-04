package com.example.backend.exception;

import org.springframework.http.HttpStatus;

public class ErrorResponse {

    private final String code;
    private final String message;
    private final HttpStatus status;

    public ErrorResponse(ErrorCode errorCode){
        this.code = errorCode.name();
        this.message = errorCode.getMessage();
        this.status = errorCode.getStatus();
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public String getCode() {
        return code;
    }

}
