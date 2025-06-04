package com.example.backend.dto.reward.rewardItemImages.request;

import com.example.backend.entity.reward.RewardItemImages;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RewardImagesUpdateDTO {
    private long rewardItemId;
    private String RewardItemsImgUrl;

    public RewardItemImages toEntity(){
        return RewardItemImages.builder()
                .rewardItemId(rewardItemId)
                .rewardItemsImgUrl(RewardItemsImgUrl)
                .build();
    }

}
