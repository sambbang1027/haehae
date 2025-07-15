package com.example.backend.mission.userMissionStatus.dto.response;

import com.example.backend.entity.mission.UserMissionStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class UserMissionStatusCheckResponseDTO {
    private UserMissionStatus.MissionStatus missionStatus;
}
