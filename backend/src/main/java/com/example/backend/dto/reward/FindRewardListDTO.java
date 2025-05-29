package com.example.backend.dto.reward;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FindRewardListDTO {
    private Long rewardItemId;
    private String name;
    private Long pointCost;
    private String rewardItemsImgUrl;
}
