package com.example.backend.user.repository;


import com.example.backend.user.dto.TotalAndLevelDTO;

public interface UserRepositoryCustom {
    String getRegionCodeById(String username);
    TotalAndLevelDTO findUserLevelAndPoint(Long userId);
}
