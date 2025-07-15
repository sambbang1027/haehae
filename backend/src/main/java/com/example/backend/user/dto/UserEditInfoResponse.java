package com.example.backend.user.dto;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDate;

@Builder
@Getter
public class UserEditInfoResponse {
    private String username;
    private String phoneNumber;
    private LocalDate birth;
    private String address;
    private String bcode;
    private String residenceType;
}
