package com.example.backend.reward.rewardItems.service;


import com.example.backend.reward.rewardItems.dto.request.RewardItemsRequestUpdateDTO;
import com.example.backend.reward.rewardItems.dto.request.RewardRequestDTO;
import com.example.backend.reward.rewardItems.dto.response.FindRewardDetailDTO;
import com.example.backend.reward.rewardItems.dto.response.FindRewardListDTO;
import com.example.backend.entity.reward.RewardItems;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RewardItemsService  {
     void rewardItemInsert(RewardRequestDTO dto);
     List<FindRewardListDTO> findRewardItemList(@Param("rewardType")RewardItems.RewardType rewardType);
     FindRewardDetailDTO findRewardDetail(@Param("id")long id);
     void rewardItemUpdate(RewardItemsRequestUpdateDTO dto);
     void rewardDeleteById(@Param("id") long id);
}
