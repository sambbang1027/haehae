package com.example.backend.security;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;


import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public  void commence(HttpServletRequest request,
                          HttpServletResponse response,
                          AuthenticationException exception)throws IOException{

        ErrorCode errorCode = ErrorCode.INVALID_TOKEN;
        ErrorResponse errorResponse = ErrorResponse.of(errorCode);

        response.setStatus(errorCode.getStatus().value());
        response.setContentType("application/json;charset=UTF-8");

        new ObjectMapper().writeValue(response.getWriter(), errorResponse);
    }
}
