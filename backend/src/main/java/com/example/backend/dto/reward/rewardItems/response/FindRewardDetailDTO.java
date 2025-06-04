package com.example.backend.dto.reward.rewardItems.response;

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
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private List<Long> rewardImageId;
    private List<String>  rewardItemsImgUrl;


    @QueryProjection
    public FindRewardDetailDTO(long id,
                               String name,
                               String description,
                               long pointCost,
                               Timestamp createdAt,
                               Timestamp updateAt,
                               List<Long> rewardImageId,
                               List<String> rewardItemsImgUrl
                            ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.pointCost = pointCost;
        this.createdAt = createdAt;
        this.updatedAt = updateAt;
        this.rewardImageId = rewardImageId;
        this.rewardItemsImgUrl = rewardItemsImgUrl;
    }
}


