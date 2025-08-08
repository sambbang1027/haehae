package com.example.backend.mission.userMissions.repository;

import com.example.backend.myActivity.dto.MyMissionHistoryResponse;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface UserMissionCustom {
    Long countUserMission(@Param("userId")Long userId, @Param("startAt") Timestamp startAt, @Param("endAt") Timestamp endAt);

    List<MyMissionHistoryResponse> getUserMissionHistory(@Param("userId")Long userId, Long cursor, int limitPlusOne, int filterRange );
}
