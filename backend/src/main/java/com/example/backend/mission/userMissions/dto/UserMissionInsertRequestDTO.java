package com.example.backend.mission.userMissions.dto;

import com.example.backend.entity.mission.UserMissions;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserMissionInsertRequestDTO {
    private Long userPointId;
    private Long userMissionStatusId;

    public UserMissions toEntity(){
        return UserMissions.builder()
                .userPointId(userPointId)
                .userMissionStatusId(userMissionStatusId)
                .build();
    }
}
