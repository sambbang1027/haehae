package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestControllerAdvice
public class HaehaeExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(HaehaeExceptionHandler.class);

    @ExceptionHandler(HaehaeException.class)
    public ResponseEntity<ErrorResponse> handleHaehae(HaehaeException exception){

        logger.error("[{}] {}",exception.getErrorCode().name(), exception.getMessage(),exception);

        ErrorResponse response = ErrorResponse.of(exception.getErrorCode());
        return ResponseEntity.status(exception.getErrorCode().getStatus()).body(response);
    }

    // 예측 불가 에러용
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpected(Exception ex) {
        logger.error("Unexpected error", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of(ErrorCode.INTERNAL_SERVER_ERROR));
    }

}
