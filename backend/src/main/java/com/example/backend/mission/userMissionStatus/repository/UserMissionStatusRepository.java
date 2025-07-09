package com.example.backend.mission.userMissionStatus.repository;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.entity.mission.UserMissionStatus;
import com.example.backend.mission.userMissionStatus.dto.response.UserMissionStatusCheckResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMissionStatusRepository extends JpaRepository<UserMissionStatus , Long>,UserMissionStatusCustom {
    @Query(" SELECT u " +
            " FROM UserMissionStatus u" +
            " WHERE u.previewMissionId = :previewMissionId " +
            " AND u.userId = :userId")
    UserMissionStatus findByPreviewMissionId(@Param("previewMissionId") Long previewMissionId, @Param("userId")Long userId);

    // 상태 체크
    // 이미 MissionStatus가 COMPLETED 인 경우 확인.
    @Query(" SELECT new com.example.backend.mission.userMissionStatus.dto.response.UserMissionStatusCheckResponseDTO " +
            " (u.missionStatus) " +
            " FROM UserMissionStatus u " +
            " WHERE u.id = :id")
    UserMissionStatusCheckResponseDTO checkStatusComplete(@Param("id") Long id);
}
