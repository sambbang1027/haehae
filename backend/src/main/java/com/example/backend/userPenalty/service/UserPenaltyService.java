package com.example.backend.userPenalty.service;

import com.example.backend.entity.report.UserPenalty;
import com.example.backend.userPenalty.dto.FrontUserPenaltyRequestDTO;

import java.sql.Timestamp;

public interface UserPenaltyService {
    void userPenaltySave(FrontUserPenaltyRequestDTO dto);
    String existEndAtUserId(Long userId);
}
