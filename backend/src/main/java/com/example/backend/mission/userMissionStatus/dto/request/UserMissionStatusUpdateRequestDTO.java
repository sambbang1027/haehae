package com.example.backend.mission.userMissionStatus.dto.request;

import com.example.backend.entity.mission.UserMissionStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserMissionStatusUpdateRequestDTO {
    private Long id;
    private UserMissionStatus.MissionStatus status;
    private Long userId;
    private Long previewMissionId;

    public UserMissionStatus toUserMissionStatusUpdateEntity(){
        return UserMissionStatus.builder()
                .id(id)
                .missionStatus(status)
                .userId(userId)
                .previewMissionId(previewMissionId)
                .build();
    }
}
