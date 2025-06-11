package com.example.backend.exception;

public enum ErrorCategory {
    VALIDATION, // 입력값 유효성
    USER,
    AUTH,
    SYSTEM, // 시스템 내부 오류(서버 오류, db연결 오류 등 사용자의 잘못이 없는 오류들)
    SHARING,
}
