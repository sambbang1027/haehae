package com.example.backend.mission.userMissions.repository;

import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;

public interface UserMissionCustom {
    Long countUserMission(@Param("userId")Long userId, @Param("startAt") Timestamp startAt, @Param("endAt") Timestamp endAt);
}
