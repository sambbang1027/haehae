package com.example.backend.reward.userReward.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

@Getter
@Setter
@ToString
public class UserRewardRecodeDTO {
    private long id;
    private long userId;
    private long rewardItemId;
    private String name;
    private long pointCost;
    private Timestamp issuedAt;
    private String rewardItemImgUrl;

    @QueryProjection
    public UserRewardRecodeDTO(long id, long userId, long rewardItemId,
                               String name, long pointCost,
                               Timestamp issuedAt, String rewardItemImgUrl){
        this.id =id;
        this.userId = userId;
        this.rewardItemId = rewardItemId;
        this.name = name;
        this.pointCost = pointCost;
        this.issuedAt = issuedAt;
        this.rewardItemImgUrl = rewardItemImgUrl;
    }
}



