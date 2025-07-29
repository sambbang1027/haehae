package com.example.backend.userPenalty.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FrontUserPenaltyRequestDTO {
    private Long reasonCode;
    private Long period;
    private Long reportId;
}
