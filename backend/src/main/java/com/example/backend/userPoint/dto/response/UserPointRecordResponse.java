package com.example.backend.userPoint.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.time.LocalDate;

@AllArgsConstructor
@Builder
@Getter
public class UserPointRecordResponse {

    private Long userId;
    private Long currentPoint;
    private String pointType;
    private Long amount;
    private String source;
    private LocalDate createAt;

    public UserPointRecordResponse(Long userId, Long currentPoint, String pointType,
                                   Long amount, String source, Timestamp createdAt) {
        this.userId = userId;
        this.currentPoint = currentPoint;
        this.pointType = pointType;
        this.amount = amount;
        this.source = source;
        this.createAt = createdAt.toLocalDateTime().toLocalDate(); // 변환
    }
}
