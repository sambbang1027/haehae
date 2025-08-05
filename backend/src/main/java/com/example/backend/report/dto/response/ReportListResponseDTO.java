package com.example.backend.report.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReportListResponseDTO {
    private Long id;
    private Long reporterId;
    private Long reasonCode;
    private String details;

    @QueryProjection
    public ReportListResponseDTO(Long id, Long reporterId, Long reasonCode,
                                 String details){
        this.id=id;
        this.reporterId=reporterId;
        this.reasonCode=reasonCode;
        this.details=details;

    }
}


