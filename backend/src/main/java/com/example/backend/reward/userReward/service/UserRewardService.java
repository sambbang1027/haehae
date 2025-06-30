package com.example.backend.reward.userReward.service;

import com.example.backend.reward.userReward.dto.request.UserRewardPointRequestInsertDTO;

public interface UserRewardService {
    void UserRewardPointInsert(UserRewardPointRequestInsertDTO dto);
    Long userFindPoint(Long userId);
}
