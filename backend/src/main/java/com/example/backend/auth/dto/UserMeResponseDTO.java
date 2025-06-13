package com.example.backend.auth.dto;


import com.example.backend.entity.user.User;
import lombok.Builder;
import lombok.Getter;


@Builder
@Getter
public class UserMeResponseDTO {

    private Long userId;
    private String email;
    private String nickname;
    private String profileImage;
    private User.Role role;
}
