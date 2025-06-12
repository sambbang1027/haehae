package com.example.backend.reward.userReward.dto.request;

import com.example.backend.entity.UserPoint;
import com.example.backend.entity.reward.UserRewards;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRewardPointRequestInsertDTO {
    private long userId;
    private String pointType;
    private long amount;
    private String source;

    private long userPointId;
    private long rewardItemId;
    private UserRewards.Status status;

    public UserPoint toEntityUserPoint(){
        return UserPoint.builder()
                .userId(userId)
                .pointType(pointType)
                .amount(amount)
                .source(pointType)
                .build();
    }

    public UserRewards toEntityUserReward(long userPointId){
        return UserRewards.builder()
                .userPointId(userPointId)
                .rewardItemId(rewardItemId)
                .status(UserRewards.Status.AVAILABLE)
                .build();
    }
}
