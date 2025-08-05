package com.example.backend.userPenalty.dto;

import com.example.backend.entity.report.UserPenalty;
import com.example.backend.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPenaltyInsertRequestDTO {
    private Long penaltyUserId;
    private Long reasonCode;
    private Timestamp startAt;
    private Timestamp endAt;
    private Long reportId;

    public UserPenalty toUserPenaltyEntity(){
        return UserPenalty.builder()
                .penaltyUserId(penaltyUserId)
                .reasonCode(reasonCode)
                .startAt(startAt)
                .endAt(endAt)
                .reportId(reportId)
                .penaltyStatus(UserPenalty.PenaltyStatus.ACTIVE)
                .build();
    }
}
