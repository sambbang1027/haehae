package com.example.backend.reward.userReward.repository;

import com.example.backend.entity.reward.RewardItems;
import com.example.backend.reward.userReward.dto.response.UserRewardRecodeDTO;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;

public interface UserRewardRepositoryCustom {
    UserRewardRecodeDTO findUserRewardById(@Param("id") long id);
    Long countUserReward(long userId, Timestamp startAt, Timestamp endAt, RewardItems.RewardType rewardType);
}
