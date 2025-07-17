package com.example.backend.user.dto;

import com.example.backend.entity.user.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserEditInfoRequest {

    private Long userId;
    private String name;
    private String phoneNumber;
    private String birth;
    private String address;
    private String bcode;
    private String residenceType;
}
