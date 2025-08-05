package com.example.backend.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReportListDTO {
    private Long id;
    private Long reporterId;
    private String reasonCode;
    private String details;

}
