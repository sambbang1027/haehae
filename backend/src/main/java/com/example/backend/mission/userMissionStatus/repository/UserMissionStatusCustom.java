package com.example.backend.mission.userMissionStatus.repository;

import com.example.backend.entity.mission.UserMissionStatus;

public interface UserMissionStatusCustom {
    void userStatusUpdate(Long id, UserMissionStatus.MissionStatus status);
}
