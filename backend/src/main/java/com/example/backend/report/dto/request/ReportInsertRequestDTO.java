package com.example.backend.report.dto.request;

import com.example.backend.entity.report.Report;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportInsertRequestDTO {
    @NotNull
    private Long reporterId;
    @NotNull
    private Report.TargetType targetType;
    @NotNull
    private Long targetId;
    @NotNull
    private Long reasonCode;
    private String details;

    public Report toEntity(){
        return Report.builder()
                .reporterId(reporterId)
                .targetType(targetType)
                .targetId(targetId)
                .reasonCode(reasonCode)
                .details(details)
                .status(Report.Status.PENDING)
                .build();

    }
}
