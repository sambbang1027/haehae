package com.example.backend.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
    // AUTH
    INVALID_TOKEN(ErrorCategory.AUTH,HttpStatus.UNAUTHORIZED,"유효하지 않은 토큰입니다."),
    REFRESH_TOKEN_NOT_FOUND(ErrorCategory.AUTH, HttpStatus.NOT_FOUND, "리프레시 토큰이 존재하지 않습니다"),
    PASSWORD_NOT_MATCH(ErrorCategory.AUTH, HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다."),
    REFRESH_TOKEN_NOT_MATCH(ErrorCategory.AUTH, HttpStatus.UNAUTHORIZED, "토큰이 일치하지 않습니다."),
    ACCESS_DENIED(ErrorCategory.AUTH, HttpStatus.FORBIDDEN, "접근 권한이 없습니다"),
    EMAIL_IO_ERROR(ErrorCategory.AUTH, HttpStatus.SERVICE_UNAVAILABLE, "이메일 전송 중 네트워크 오류 발생"),
    GOOGLE_VERIFY_FAILED(ErrorCategory.AUTH, HttpStatus.UNAUTHORIZED, "구글 토큰 검증 중 오류 발생"),
    VERIFICATION_TOKEN_NOT_FOUND(ErrorCategory.AUTH, HttpStatus.NOT_FOUND, "해당 토큰을 찾을 수 없습니다"),

    // USER
    USER_NOT_FOUND(ErrorCategory.USER,HttpStatus.NOT_FOUND,"존재하지 않는 회원입니다."),
    DUPLICATE_EMAIL(ErrorCategory.USER, HttpStatus.BAD_REQUEST, "이미 가입된 이메일입니다."),
    DUPLICATE_NICKNAME(ErrorCategory.USER,HttpStatus.BAD_REQUEST, "이미 사용중인 닉네임입니다."),
    INACTIVE_USER(ErrorCategory.USER, HttpStatus.FORBIDDEN, "탈퇴한 회원입니다"),
    BLOCKED_USER(ErrorCategory.USER, HttpStatus.FORBIDDEN, "차단된 회원입니다"),

    // VALIDATION
    INVALID_EMAIL_FORMAT(ErrorCategory.VALIDATION,HttpStatus.BAD_REQUEST, "이메일 형식이 올바르지 않습니다."),
    INVALID_PASSWORD_PATTERN(ErrorCategory.VALIDATION,HttpStatus.BAD_REQUEST, "비밀번호는 영문자, 숫자, 특수문자를 포함한 8~12여야 합니다."),
    INVALID_NICKNAME_PATTERN(ErrorCategory.VALIDATION,HttpStatus.BAD_REQUEST, "닉네임은 한글, 영문, 숫자 포함 2~10자여야 합니다."),
    INVALID_ADDRESS(ErrorCategory.VALIDATION,HttpStatus.BAD_REQUEST	,"도로명 주소 입력은 필수입니다."),
    INVALID_BCODE(ErrorCategory.VALIDATION,HttpStatus.BAD_REQUEST,"행정동 코드 입력은 필수입니다."),
    INVALID_PHONE_NUMBER(ErrorCategory.VALIDATION,HttpStatus.BAD_REQUEST, "유효하지않은 전화번호 형식입니다."),
    INVALID_VERIFICATION_TYPE(ErrorCategory.VALIDATION, HttpStatus.BAD_REQUEST,"유효하지않은 인증 타입입니다."),
    INVALID_VERIFICATION_CODE(ErrorCategory.VALIDATION, HttpStatus.BAD_REQUEST,"인증 코드가 유효하지 않습니다."),
    INVALID_RESIDENCE_TYPE(ErrorCategory.VALIDATION, HttpStatus.BAD_REQUEST, "잘못된 주거 타입입니다."),

    //SHARING
    POST_TITLE_REQUIRED(ErrorCategory.SHARING, HttpStatus.BAD_REQUEST, "제목 입력은 필수 입니다."),


    //SYSTEM
    INTERNAL_SERVER_ERROR(ErrorCategory.SYSTEM,HttpStatus.INTERNAL_SERVER_ERROR	,"서버 오류가 발생했습니다."),
    DATABASE_ERROR(ErrorCategory.SYSTEM, HttpStatus.INTERNAL_SERVER_ERROR,"데이터베이스 처리 중 오류가 발생했습니다."),
    EXTERNAL_API_ERROR(ErrorCategory.SYSTEM, HttpStatus.BAD_GATEWAY,"외부 서비스와의 통신에 실패했습니다."),
    GEOCODING_FAILED(ErrorCategory.SYSTEM, HttpStatus.NOT_FOUND, "주소에 대한 지오코딩 결과가 없습니다.");


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
