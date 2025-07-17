package com.example.backend.user.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ResetUserPwRequest {

    private String oldPw;
    private String newPw;
}

