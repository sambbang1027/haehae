package com.example.backend.repository.reward;

import com.example.backend.dto.reward.UserRewardRecodeDTO;
import org.springframework.data.repository.query.Param;

public interface UserRewardRepositoryCustom {
    UserRewardRecodeDTO findUserRewardById(@Param("id") long id);
}
