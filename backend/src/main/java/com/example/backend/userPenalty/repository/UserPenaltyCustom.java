package com.example.backend.userPenalty.repository;

import com.example.backend.entity.report.UserPenalty;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;

public interface UserPenaltyCustom {
    Timestamp existEndAtUserId(@Param("penaltyUserId") Long penaltyUserId, @Param("penaltyStatus") UserPenalty.PenaltyStatus penaltyStatus);
}
