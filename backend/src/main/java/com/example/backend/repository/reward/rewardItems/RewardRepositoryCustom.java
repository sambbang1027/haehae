package com.example.backend.repository.reward.rewardItems;


import com.example.backend.dto.reward.rewardItems.response.FindRewardDetailDTO;
import com.example.backend.dto.reward.rewardItems.response.FindRewardListDTO;
import com.example.backend.entity.reward.RewardItems;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RewardRepositoryCustom {
    List<FindRewardListDTO> findRewardList(@Param("rewardType")RewardItems.RewardType rewardType);
    FindRewardDetailDTO findRewardDetailById(@Param("id") long id);

}
