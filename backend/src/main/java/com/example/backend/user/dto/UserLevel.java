package com.example.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class UserLevel {

    private String nickname;
    private String levelName;

}
