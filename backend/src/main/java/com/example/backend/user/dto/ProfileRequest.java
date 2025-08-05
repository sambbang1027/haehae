package com.example.backend.user.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ProfileRequest {

    private List<String> profileImageUrl;
    private String nickname;
    private Long userId;
}
