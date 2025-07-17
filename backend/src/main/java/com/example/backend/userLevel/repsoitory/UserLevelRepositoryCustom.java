package com.example.backend.userLevel.repsoitory;

import com.example.backend.userLevel.dto.UserLevel;

public interface UserLevelRepositoryCustom {
    UserLevel getUserLevelInfo(Long userId);
}
