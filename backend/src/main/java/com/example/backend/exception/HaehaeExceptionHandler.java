package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
public class HaehaeExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(HaehaeExceptionHandler.class);

    @ExceptionHandler(HaehaeException.class)
    public ResponseEntity<ErrorResponse> handleHaehae(HaehaeException exception){
        ErrorCode errorCode = exception.getErrorCode();

        logger.error("[{}] {}", errorCode.name(), errorCode.getMessage(), exception);

        ErrorResponse response = ErrorResponse.of(errorCode);
        return ResponseEntity.status(errorCode.getStatus()).body(response);
    }


    // 예측 불가 에러용
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpected(Exception ex) {
        logger.error("Unexpected error", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of(ErrorCode.INTERNAL_SERVER_ERROR));
    }


    @ExceptionHandler(RewardException.class)
    public ResponseEntity<Map<String, Object>> handleCustomException(RewardException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("message", ex.getMessage());
        HttpStatus status = HttpStatus.BAD_REQUEST;

        return ResponseEntity.status(status).body(body);
    }

    @ExceptionHandler(PenaltyException.class)
    public ResponseEntity<Map<String, Object>> handleCustomException(PenaltyException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("message", ex.getMessage());
        HttpStatus status = HttpStatus.BAD_REQUEST;

        return ResponseEntity.status(status).body(body);
    }
}



