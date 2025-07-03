package com.example.backend.mission.missions.dto.request;

import com.example.backend.entity.mission.Missions;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MissionUpdateRequestDTO {
    @NotNull(message = "미션 ID는 필수입니다.")
    private long id;

    @NotNull(message = "미션 타입은 필수입니다.")
    private Missions.MissionType missionType;

    @NotBlank(message = "미션 내용은 필수입니다.")
    private String missionContent;

    @NotNull(message = "미션 카테고리는 필수입니다.")
    private Missions.MissionCategory missionCategory;

    @NotNull(message = "미션 포인트는 필수입니다.")
    @Min(value = 0, message = "포인트는 0 이상이어야 합니다.")
    private Long missionPoint;

    public Missions toMissionEntity(){
        return Missions.builder()
                .id(id)
                .missionType(missionType)
                .missionContent(missionContent)
                .missionCategory(missionCategory)
                .missionPoint(missionPoint)
                .build();
    }
}
