package com.example.backend.mission.previewMissions.dto.request;

import com.example.backend.entity.mission.PreviewMissions;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class PreviewMissionRequestDTO {
    private Long missionId;
    private PreviewMissions.PreviewMissionType previewMissionType;
    private String previewMissionContent;
    private Long previewMissionPoint;
    private PreviewMissions.PreviewMissionCategory previewMissionCategory;
    private Timestamp startAt;
    private Timestamp endAt;
    private PreviewMissions.PreviewMissionStatus previewMissionStatus;
    private Long quantityCondition;

    public PreviewMissions toPreviewMissionEntity(){
        return PreviewMissions.builder()
                .missionId(missionId)
                .previewMissionType(previewMissionType)
                .previewMissionContent(previewMissionContent)
                .previewMissionPoint(previewMissionPoint)
                .previewMissionCategory(previewMissionCategory)
                .startAt(startAt)
                .endAt(endAt)
                .previewMissionStatus(previewMissionStatus)
                .quantityCondition(quantityCondition)
                .build();
    }
}
