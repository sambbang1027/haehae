package com.example.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class LocalRegisterDTO {

    private String email;
    private String name;
    private String password;
    private String nickname;
    private String phoneNumber;
    private String birth;
    private String address;
    private String bcode;
    private String residenceType;

}
