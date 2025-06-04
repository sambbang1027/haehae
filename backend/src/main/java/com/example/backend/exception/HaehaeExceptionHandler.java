package com.example.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice
public class HaehaeExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(HaehaeExceptionHandler.class);

    @ExceptionHandler(HaehaeException.class)
    public ResponseEntity<ErrorResponse> handleHaehae(HaehaeException exception){

        logger.error("[{}] {}",exception.getErrorCode().name(), exception.getMessage(),exception);

        ErrorResponse response = new ErrorResponse(exception.getErrorCode());
        return ResponseEntity.status(exception.getErrorCode().getStatus()).body(response);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity
                .badRequest()
                .body("잘못된 요청입니다: " + ex.getMessage());
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException ex){
        return ResponseEntity
                .badRequest()
                .body("잘못된 요청입니다 : "+ ex.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex){
        return ResponseEntity
                .badRequest()
                .body("실행오류 : "+ ex.getMessage());
    }

}
