package com.example.backend.mission.userMissionStatus.service;

import com.example.backend.entity.mission.UserMissionStatus;
import com.example.backend.userPoint.dto.request.UserMissionSuccessRequestDTO;

public interface UserMissionStatusService {
    void checkStatusUpdate(Long userId);
    void completeUpdateUserStatus(UserMissionSuccessRequestDTO dto);
}
