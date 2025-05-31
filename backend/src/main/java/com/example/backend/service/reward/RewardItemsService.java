package com.example.backend.service.reward;

import com.example.backend.dto.reward.FindRewardDetailDTO;
import com.example.backend.dto.reward.FindRewardListDTO;
import com.example.backend.dto.reward.RewardRequestDTO;
import com.example.backend.entity.reward.RewardItems;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface RewardItemsService  {
     void RewardItemInsert(RewardRequestDTO dto);
     List<FindRewardListDTO> findRewardItemList(@Param("rewardType")RewardItems.RewardType rewardType);
     FindRewardDetailDTO findRewardDetail(@Param("id")long id);
}
