package com.example.backend.user.dto;

import com.example.backend.entity.user.UserLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserInfoAndNextLevelInfoDTO {
    private TotalAndLevelDTO totalAndLevelDTO;
    private UserLevel userLevel;
}
