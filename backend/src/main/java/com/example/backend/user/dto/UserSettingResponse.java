package com.example.backend.user.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserSettingResponse {
    private String username;
    private String residenceType;
}
