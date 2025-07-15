package com.example.backend.user.service;

import com.example.backend.user.dto.TotalAndLevelDTO;
import com.example.backend.user.dto.UserInfoAndNextLevelInfoDTO;


public interface UserInfoService {
    UserInfoAndNextLevelInfoDTO findCurrentAndTotalPointByUserId(long id);
}
