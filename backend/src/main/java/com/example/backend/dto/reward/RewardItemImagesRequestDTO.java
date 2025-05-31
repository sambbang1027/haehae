package com.example.backend.dto.reward;

import com.example.backend.entity.reward.RewardItemImages;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
public class RewardItemImagesRequestDTO {
    private long rewardItemId;
    private String rewardItemsImgUrl;


    public RewardItemImages toEntity(){
        return RewardItemImages.builder()
                .rewardItemId(rewardItemId)
                .rewardItemsImgUrl(rewardItemsImgUrl)
                .build();
    }

}
