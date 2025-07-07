package com.example.backend.mission.missions.service;

import com.example.backend.entity.mission.Missions;
import com.example.backend.mission.missions.dto.request.MissionInsertRequestDTO;
import com.example.backend.mission.missions.dto.request.MissionUpdateRequestDTO;
import com.example.backend.mission.missions.dto.response.MissionResponseDTO;
import com.example.backend.pagination.response.CursorPageResponse;

import java.util.List;

public interface MissionService {
    CursorPageResponse<MissionResponseDTO> searchMissionsByConditionForAdmin(
            Missions.MissionType missionType,
            Missions.MissionCategory missionCategory,
            String searchKeyword,
            Long cursor,
            int limit
    );

    void missionInsert(MissionInsertRequestDTO dto);
    void missionUpdate(MissionUpdateRequestDTO dto);
    void missionDelete(Long id);
    void missionDeleteList(List<Long> idList);

}
