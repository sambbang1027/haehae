package com.example.backend.mission.previewMissions.dto.response;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.entity.mission.UserMissionStatus;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class PreviewMissionListAndUserStatusDTO {
    private Long id;
    private String previewMissionContent;
    private Long previewMissionPoint;
    private PreviewMissions.PreviewMissionType previewMissionType;
    private Long userMissionStatusId;
    private UserMissionStatus.MissionStatus missionStatus;

    @QueryProjection
    public PreviewMissionListAndUserStatusDTO(Long id,
                                              String previewMissionContent,
                                              Long previewMissionPoint,
                                              PreviewMissions.PreviewMissionType previewMissionType,
                                              Long userMissionStatusId,
                                              UserMissionStatus.MissionStatus missionStatus){

        this.id = id;
        this.previewMissionContent = previewMissionContent;
        this.previewMissionPoint = previewMissionPoint;
        this.previewMissionType = previewMissionType;
        this.userMissionStatusId = userMissionStatusId;
        this.missionStatus = missionStatus;
    }
}
