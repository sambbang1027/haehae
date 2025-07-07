package com.example.backend.auth.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class KaKaoResponse {

    private Long kakaoId;
    private String email;
    private String name;
    private LocalDate birth;
    private String phoneNumber;

}
