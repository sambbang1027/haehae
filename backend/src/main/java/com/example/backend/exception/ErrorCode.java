package com.example.backend.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
    // AUTH
    INVALID_TOKEN(ErrorCategory.AUTH,HttpStatus.UNAUTHORIZED,"유효하지 않은 토큰입니다."),

    // USER
    USER_NOT_FOUND(ErrorCategory.USER,HttpStatus.NOT_FOUND,"존재하지 않는 회원입니다."),

    // VALIDATION
    INVALID_EMAIL_FORMAT(ErrorCategory.VALIDATION,HttpStatus.BAD_REQUEST, "이메일 형식이 올바르지 않습니다."),
    INVALID_PASSWORD_PATTERN(ErrorCategory.VALIDATION,HttpStatus.BAD_REQUEST, "비밀번호는 영문자, 숫자, 특수문자를 포함한 8~12여야 합니다."),
    INVALID_NICKNAME_PATTERN(ErrorCategory.VALIDATION,HttpStatus.BAD_REQUEST, "닉네임은 한글, 영문, 숫자 포함 2~10자여야 합니다."),
    INVALID_ADDRESS(ErrorCategory.VALIDATION,HttpStatus.BAD_REQUEST	,"도로명 주소 입력은 필수입니다."),
    INVALID_BCODE(ErrorCategory.VALIDATION,HttpStatus.BAD_REQUEST,"행정동 코드 입력은 필수입니다."),

    //SYSTEM
    INTERNAL_SERVER_ERROR(ErrorCategory.SYSTEM,HttpStatus.INTERNAL_SERVER_ERROR	,"서버 오류가 발생했습니다."),
    DATABASE_ERROR(ErrorCategory.SYSTEM, HttpStatus.INTERNAL_SERVER_ERROR,"데이터베이스 처리 중 오류가 발생했습니다."),
    EXTERNAL_API_ERROR(ErrorCategory.SYSTEM, HttpStatus.BAD_GATEWAY,"외부 서비스와의 통신에 실패했습니다.");



    private final ErrorCategory category;
    private final String message;
    private final HttpStatus status;

    ErrorCode (ErrorCategory category, HttpStatus status, String message){
        this.category = category;
        this.status = status;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
    public  ErrorCategory getCategory(){
        return category;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
