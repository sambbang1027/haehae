package com.example.backend.reward.rewardItems.repository;



import com.example.backend.entity.reward.RewardItems;
import org.springframework.data.repository.query.Param;
import com.example.backend.reward.rewardItems.dto.response.FindRewardDetailDTO;
import com.example.backend.reward.rewardItems.dto.response.FindRewardListDTO;

import java.util.List;

public interface RewardRepositoryCustom {
    List<FindRewardListDTO> findRewardList(@Param("rewardType")RewardItems.RewardType rewardType);
    FindRewardDetailDTO findRewardDetailById(@Param("id") long id);

}
