package com.example.backend.exception;

public class HaehaeException extends RuntimeException{
    private final ErrorCode errorCode;

    public HaehaeException (ErrorCode errorCode){
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode(){
        return errorCode;
    }

}
