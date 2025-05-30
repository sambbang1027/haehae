package com.example.backend.dto.reward;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.util.Collections;
import java.util.List;

@Getter
@ToString
@Setter
public class FindRewardListDTO {
    private Long id;
    private String name;
    private Long pointCost;
    private List<String> rewardItemsImgUrl;

    @QueryProjection // <--- 생성자에 붙입니다.
    public FindRewardListDTO(Long id, String name, Long pointCost, String rewardItemsImgUrl) {
        this.id = id;
        this.name = name;
        this.pointCost = pointCost;
        this.rewardItemsImgUrl = (rewardItemsImgUrl != null) ? Collections.singletonList(rewardItemsImgUrl) : Collections.emptyList();
    }
}
