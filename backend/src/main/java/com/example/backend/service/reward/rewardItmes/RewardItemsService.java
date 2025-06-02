package com.example.backend.service.reward.rewardItmes;


import com.example.backend.dto.reward.rewardItems.request.RewardItemsRequestUpdateDTO;
import com.example.backend.dto.reward.rewardItems.request.RewardRequestDTO;
import com.example.backend.dto.reward.rewardItems.response.FindRewardDetailDTO;
import com.example.backend.dto.reward.rewardItems.response.FindRewardListDTO;
import com.example.backend.entity.reward.RewardItems;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface RewardItemsService  {
     void RewardItemInsert(RewardRequestDTO dto);
     List<FindRewardListDTO> findRewardItemList(@Param("rewardType")RewardItems.RewardType rewardType);
     FindRewardDetailDTO findRewardDetail(@Param("id")long id);
     void RewardItemUpdate(RewardItemsRequestUpdateDTO dto);
}
