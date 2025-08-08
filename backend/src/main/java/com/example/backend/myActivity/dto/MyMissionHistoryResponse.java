package com.example.backend.myActivity.dto;

import com.example.backend.entity.mission.PreviewMissions;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.sql.Timestamp;
import java.time.LocalDate;

@AllArgsConstructor
@Getter
public class MyMissionHistoryResponse {
    private Long missionId;
    private LocalDate completedAt;
    private String missionType;
    private Long missionPoint;
    private String missionContent;

    public MyMissionHistoryResponse(Long missionId, Timestamp completedAt,
                                    PreviewMissions.PreviewMissionType missionType, String missionContent, Long missionPoint){
        this.missionId = missionId;
        this.completedAt = completedAt.toLocalDateTime().toLocalDate();
        this.missionType = missionType.name();
        this.missionContent = missionContent;
        this.missionPoint = missionPoint;
    }
}
