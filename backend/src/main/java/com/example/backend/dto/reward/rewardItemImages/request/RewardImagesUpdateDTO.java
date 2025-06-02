package com.example.backend.dto.reward.rewardItemImages.request;

import com.example.backend.entity.reward.RewardItemImages;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RewardImagesUpdateDTO {
    private long rewardItemId;
    private String rewardTimesImgUrl;

    public RewardItemImages toEntity(){
        return RewardItemImages.builder()
                .rewardItemId(rewardItemId)
                .rewardItemsImgUrl(rewardTimesImgUrl)
                .build();
    }

}
