package com.example.backend.reward.rewardItems.dto.response;

import com.example.backend.entity.reward.RewardItems;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@ToString
public class FindRewardDetailDTO {
    private long id;
    private String name;
    private String description;
    private long pointCost;
    private String organization;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private RewardItems.RewardType rewardType;
    private List<Long> rewardImageId;
    private List<String>  rewardItemsImgUrl;


    @QueryProjection
    public FindRewardDetailDTO(long id,
                               String name,
                               String description,
                               long pointCost,
                               String organization,
                               Timestamp createdAt,
                               Timestamp updateAt,
                               RewardItems.RewardType rewardType,
                               List<Long> rewardImageId,
                               List<String> rewardItemsImgUrl
                            ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.pointCost = pointCost;
        this.organization = organization;
        this.createdAt = createdAt;
        this.updatedAt = updateAt;
        this.rewardType = rewardType;
        this.rewardImageId = rewardImageId;
        this.rewardItemsImgUrl = rewardItemsImgUrl;
    }
}


