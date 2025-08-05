package com.example.backend.mission.missions.dto.response;

import com.example.backend.entity.mission.Missions;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

@Setter
@Getter
@ToString
public class MissionResponseDTO {
    private Long id;
    private Missions.MissionType missionType;
    private String missionContent;
    private Timestamp createdAt;
    private Missions.MissionCategory missionCategory;
    private Long missionPoint;

    @QueryProjection
    public MissionResponseDTO(
            Long id,
            Missions.MissionType missionType,
            String missionContent,
            Timestamp createdAt,
            Missions.MissionCategory missionCategory,
            Long missionPoint
    ){
        this.id =id;
        this.missionType = missionType;
        this.missionContent = missionContent;
        this.createdAt = createdAt;
        this.missionCategory = missionCategory;
        this.missionPoint = missionPoint;

    }
}
