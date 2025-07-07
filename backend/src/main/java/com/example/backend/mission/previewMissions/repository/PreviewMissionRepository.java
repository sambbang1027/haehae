package com.example.backend.mission.previewMissions.repository;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.mission.previewMissions.dto.response.PreViewMissionStatusResponseDTO;
import com.example.backend.mission.previewMissions.dto.response.PreviewMissionListResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PreviewMissionRepository extends JpaRepository<PreviewMissions, Long> {

    @Query(" SELECT new com.example.backend.mission.previewMissions.dto.response.PreviewMissionListResponseDTO " +
            " (p.id, p.previewMissionContent, p.previewMissionPoint, p.previewMissionType, p.previewMissionCategory," +
            " p.startAt, p.endAt, p.quantityCondition) " +
            " FROM PreviewMissions p" +
            " WHERE p.previewMissionStatus= :previewMissionStatus ")
    List<PreviewMissionListResponseDTO> findPreviewALlActive(@Param("previewMissionStatus")PreviewMissions.PreviewMissionStatus previewMissionStatus);


    // 상태를 업데이트 하기 전 가져올 데이터.
    @Query(" SELECT new com.example.backend.mission.previewMissions.dto.response.PreViewMissionStatusResponseDTO " +
            " (p.id, p.previewMissionStatus) " +
            " FROM PreviewMissions p " +
            " WHERE p.previewMissionStatus = :previewMissionStatus " +
            " AND p.previewMissionType = :previewMissionType ")
    List<PreViewMissionStatusResponseDTO> findPreviewStatusList(
                @Param("previewMissionStatus") PreviewMissions.PreviewMissionStatus previewMissionStatus,
                @Param("previewMissionType")PreviewMissions.PreviewMissionType previewMissionType);

    // 업데이트를 하기전 가져올 데이터가 없을 경우 예외처리 뭐리 매서드
    @Query(" SELECT count(p) > 0 FROM PreviewMissions p " +
            " WHERE p.previewMissionStatus = :previewMissionStatus " +
            " AND p.previewMissionType = :previewMissionType ")
    Boolean existByActiveMission(
            @Param("previewMissionStatus") PreviewMissions.PreviewMissionStatus previewMissionStatus,
            @Param("previewMissionType")PreviewMissions.PreviewMissionType previewMissionType);

}
