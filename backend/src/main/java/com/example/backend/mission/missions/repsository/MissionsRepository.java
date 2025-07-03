package com.example.backend.mission.missions.repsository;

import com.example.backend.entity.mission.Missions;
import com.example.backend.mission.missions.dto.request.MissionInsertRequestDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissionsRepository extends JpaRepository<Missions, Long> , MissionsRepositoryCustom {
    boolean existsByMissionContent(String missionContent);
    boolean existsByMissionContentAndIdNot(String missionContent, Long id);
}

