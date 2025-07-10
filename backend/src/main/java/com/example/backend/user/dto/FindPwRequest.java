package com.example.backend.user.dto;


import lombok.Getter;

@Getter
public class FindPwRequest {
    private String token;
    private String newPwd;
}
