package com.example.backend.user.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TotalAndLevelDTO {
    private Long totalPoint;
    private Long userLevelId;
    private String levelName;

    @QueryProjection
    public TotalAndLevelDTO(
            Long totalPoint,
            Long userLevelId,
            String levelName
    ){
        this.totalPoint = totalPoint;
        this.userLevelId = userLevelId;
        this.levelName = levelName;
    }
}
