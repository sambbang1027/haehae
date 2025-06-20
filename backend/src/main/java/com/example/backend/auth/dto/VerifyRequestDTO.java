package com.example.backend.auth.dto;

import lombok.Getter;

@Getter
public class VerifyRequestDTO {
    private String email;;
    private String code;
}
