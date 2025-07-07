package com.example.backend.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GoogleResponse {
    private String sub;          // 구글 고유 ID
    private String email;
    private boolean emailVerified;
    private String name;         // 전체 이름
}