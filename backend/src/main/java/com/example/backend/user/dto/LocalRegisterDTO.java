package com.example.backend.user.dto;

import com.example.backend.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
@AllArgsConstructor
public class LocalRegisterDTO {

    private String email;
    private String name;
    private String password;
    private String nickname;
    private String phoneNumber;
    private LocalDate birth;
    private String address;
    private String bcode;
    private User.ResidenceType residenceType;

}
