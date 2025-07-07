package com.example.backend.mission.missions.dto.response;

import com.example.backend.entity.mission.Missions;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

@Getter
@Setter
@ToString
public class MissionPreviewDTO {
    private Long id;
    private Missions.MissionType missionType;
    private String missionContent;
    private Missions.MissionCategory missionCategory;
    private Long missionPoint;
    private Long quantityCondition;

    public MissionPreviewDTO(
            Long id,
            Missions.MissionType missionType,
            String missionContent,
            Missions.MissionCategory missionCategory,
            Long missionPoint,
            Long quantityCondition
    ){
        this.id = id;
        this.missionType = missionType;
        this.missionContent = missionContent;
        this.missionCategory = missionCategory;
        this.missionPoint = missionPoint;
        this.quantityCondition = quantityCondition;
    }
}
