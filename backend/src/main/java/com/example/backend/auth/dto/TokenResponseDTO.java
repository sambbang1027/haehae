package com.example.backend.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Builder
@AllArgsConstructor
public class TokenResponseDTO {

    private String accessToken;
    private String refreshToken;
}
