package com.example.backend.mission.missions.repsository;

import com.example.backend.entity.mission.Missions;
import com.example.backend.mission.missions.dto.request.MissionInsertRequestDTO;
import com.example.backend.mission.missions.dto.response.MissionPreviewDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissionsRepository extends JpaRepository<Missions, Long> , MissionsRepositoryCustom {
    boolean existsByMissionContent(String missionContent);
    boolean existsByMissionContentAndIdNot(String missionContent, Long id);

    @Query(" SELECT new com.example.backend.mission.missions.dto.response.MissionPreviewDTO" +
            " (m.id, m.missionType, m.missionContent, m.missionCategory, m.missionPoint, m.quantityCondition)" +
            " FROM Missions m" +
            " WHERE m.missionType = :missionType")
    List<MissionPreviewDTO> findWeeklyMissionPreview(@Param("missionType")Missions.MissionType missionType);


    @Query(" SELECT new com.example.backend.mission.missions.dto.response.MissionPreviewDTO " +
            " (m.id, m.missionType, m.missionContent, m.missionCategory, m.missionPoint, m.quantityCondition)" +
            " FROM Missions m" +
            " WHERE m.missionType = :missionType")
    List<MissionPreviewDTO> findDailyMissionPreview(@Param("missionType")Missions.MissionType missionType);
}

