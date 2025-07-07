package com.example.backend.mission.userMissionStatus.repository;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.entity.mission.UserMissionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMissionStatusRepository extends JpaRepository<UserMissionStatus , Long> {
    @Query(" SELECT u " +
            " FROM UserMissionStatus u" +
            " WHERE u.previewMissionId = :previewMissionId " +
            " AND u.userId = :userId")
    UserMissionStatus findByPreviewMissionId(@Param("previewMissionId") Long previewMissionId, @Param("userId")Long userId);

}
