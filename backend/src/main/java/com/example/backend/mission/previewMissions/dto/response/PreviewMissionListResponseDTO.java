package com.example.backend.mission.previewMissions.dto.response;

import com.example.backend.entity.mission.PreviewMissions;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

@Getter
@Setter
@ToString
public class PreviewMissionListResponseDTO {
    private Long id;
    private String previewMissionContent;
    private Long previewMissionPoint;
    private PreviewMissions.PreviewMissionType previewMissionType;
    private PreviewMissions.PreviewMissionCategory previewMissionCategory;
    private Timestamp startAt;
    private Timestamp endAt;
    private Long quantityCondition;

    public PreviewMissionListResponseDTO(Long id, String previewMissionContent,
                                         Long previewMissionPoint, PreviewMissions.PreviewMissionType previewMissionType
                                         , PreviewMissions.PreviewMissionCategory previewMissionCategory
                                         ,Timestamp startAt, Timestamp endAt
                                         , Long quantityCondition
    ){
        this.id=id;
        this.previewMissionContent = previewMissionContent;
        this.previewMissionPoint = previewMissionPoint;
        this.previewMissionType= previewMissionType;
        this.previewMissionCategory = previewMissionCategory;
        this.startAt = startAt;
        this.endAt = endAt;
        this.quantityCondition = quantityCondition;
    }
}
