package com.example.backend.mission.missions.repsository;


import com.example.backend.entity.mission.Missions;
import com.example.backend.mission.missions.dto.response.MissionResponseDTO;

import java.util.List;

public interface MissionsRepositoryCustom {
    List<MissionResponseDTO> searchMissionsByConditionForAdmin(
            Missions.MissionType missionType,
            Missions.MissionCategory missionCategory,
            String searchKeyword,
            Long cursor,
            int limitPlusOne
    );
}
