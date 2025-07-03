package com.example.backend.reward.userReward.service;

import com.example.backend.reward.userReward.dto.request.UserRewardPointRequestInsertDTO;
import com.example.backend.userPoint.dto.response.PaymentResponseDTO;

public interface UserRewardService {
    Long userRewardPointInsert(UserRewardPointRequestInsertDTO dto);
    Long userFindPoint(Long userId);
    void userRewardPayRefund(Long userPointId);
}
