package com.example.backend.report.dto.response;

import com.example.backend.entity.report.Report;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportResponseDTO {
    private Long id;
    private Report.TargetType targetType;
    private Long targetId;
}

