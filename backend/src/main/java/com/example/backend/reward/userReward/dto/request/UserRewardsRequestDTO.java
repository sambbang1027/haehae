package com.example.backend.reward.userReward.dto.request;

import com.example.backend.entity.reward.UserRewards;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRewardsRequestDTO {
    private long userId;
    private long rewardItemId;
    private UserRewards.Status status;

    public UserRewards toEntity(){
        return UserRewards.builder()
                .userId(userId)
                .rewardItemId(rewardItemId)
                .status(UserRewards.Status.AVAILABLE)
                .build();
    }
}
