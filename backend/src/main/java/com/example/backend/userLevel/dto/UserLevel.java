package com.example.backend.userLevel.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@AllArgsConstructor
@Builder
@Getter
public class UserLevel {

    private String nickname;
    private String levelName;
    private LocalDate levelAchievedAt;
    private LocalDate levelExpireAt;

}
