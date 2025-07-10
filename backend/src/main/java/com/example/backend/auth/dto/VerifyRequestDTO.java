package com.example.backend.auth.dto;

import com.example.backend.auth.enums.VerificationType;
import lombok.Getter;

@Getter
public class VerifyRequestDTO {

    private VerificationType verificationType;
    private String email;;
    private String code;
}
