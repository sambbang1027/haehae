package com.example.backend.dto.reward;

import com.example.backend.entity.reward.RewardItems;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RewardRequestDTO {
    private String name;
    private String description;
    private long PointCost;
    private long stock;
    private RewardItems.RewardType rewardType;
    private String organization;
    private long rewardItemId;
    private List<String> rewardItemsImgUrl;

    public RewardItems toRewardItemsEntity(){
        return RewardItems.builder()
                .name(name)
                .description(description)
                .pointCost(PointCost)
                .stock(stock)
                .rewardType(rewardType)
                .organization(organization)
                .build();
    }

}
