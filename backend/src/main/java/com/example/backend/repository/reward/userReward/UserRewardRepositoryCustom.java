package com.example.backend.repository.reward.userReward;

import com.example.backend.dto.reward.userRewards.response.UserRewardRecodeDTO;
import org.springframework.data.repository.query.Param;

public interface UserRewardRepositoryCustom {
    UserRewardRecodeDTO findUserRewardById(@Param("id") long id);
}
