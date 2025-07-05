package com.example.backend.mission.previeMissions.dto.response;

import com.example.backend.entity.mission.PreviewMissions;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PreviewMissionListResponseDTO {
    private Long id;
    private String previewMissionContent;
    private Long previewMissionPoint;
    private PreviewMissions.PreviewMissionType previewMissionType;
    private PreviewMissions.PreviewMissionCategory previewMissionCategory;

    public PreviewMissionListResponseDTO(Long id, String previewMissionContent,
                                         Long previewMissionPoint, PreviewMissions.PreviewMissionType previewMissionType
                                         , PreviewMissions.PreviewMissionCategory previewMissionCategory
    ){
        this.id=id;
        this.previewMissionContent = previewMissionContent;
        this.previewMissionPoint = previewMissionPoint;
        this.previewMissionType= previewMissionType;
        this.previewMissionCategory = previewMissionCategory;
    }
}
