package com.example.backend.reward.rewardItems.dto.request;

import com.example.backend.entity.reward.RewardItems;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RewardItemsRequestUpdateDTO {
    private long id;

    @NotBlank
    private String name;

    @NotNull
    private String description;
    private long PointCost;
    private long stock;
    private RewardItems.RewardType rewardType;
    private String organization;

    public RewardItems toEntity(){
        return RewardItems.builder()
                .id(id)
                .name(name)
                .description(description)
                .pointCost(PointCost)
                .stock(stock)
                .rewardType(rewardType)
                .organization(organization)
                .build();
    }
}
