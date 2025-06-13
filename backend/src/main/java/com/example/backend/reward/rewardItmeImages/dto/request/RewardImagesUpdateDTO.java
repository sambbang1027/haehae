package com.example.backend.reward.rewardItmeImages.dto.request;

import com.example.backend.entity.reward.RewardItemImages;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RewardImagesUpdateDTO {
    private long rewardItemId;
    @NotNull
    private String rewardItemsImgUrl;

    public RewardItemImages toEntity(){
        return RewardItemImages.builder()
                .rewardItemId(rewardItemId)
                .rewardItemsImgUrl(rewardItemsImgUrl)
                .build();
    }

}
