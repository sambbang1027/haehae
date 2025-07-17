package com.example.backend.user.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DeleteUserRequest {
    private Long userId;
    private String password;
}
