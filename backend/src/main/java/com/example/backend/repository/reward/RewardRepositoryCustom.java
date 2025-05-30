package com.example.backend.repository.reward;


import com.example.backend.dto.reward.FindRewardListDTO;
import com.example.backend.entity.reward.RewardItems;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RewardRepositoryCustom {
    List<FindRewardListDTO> findRewardList(@Param("rewardType")RewardItems.RewardType rewardType);
}
