package com.example.backend.mission.previeMissions.repository;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.mission.previeMissions.dto.response.PreviewMissionListResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PreviewMissionRepository extends JpaRepository<PreviewMissions, Long> {

    @Query(" SELECT new com.example.backend.mission.previeMissions.dto.response.PreviewMissionListResponseDTO" +
            " (p.id, p.previewMissionContent, p.previewMissionPoint, p.previewMissionType, p.previewMissionCategory)" +
            " FROM PreviewMissions p" +
            " WHERE p.previewMissionStatus= :previewMissionStatus")
    List<PreviewMissionListResponseDTO> findPreviewALl(@Param("previewMissionStatus")PreviewMissions.PreviewMissionStatus previewMissionStatus);

}
