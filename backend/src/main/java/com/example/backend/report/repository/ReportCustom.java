package com.example.backend.report.repository;

import com.example.backend.entity.report.Report;
import com.example.backend.report.dto.response.ReportListResponseDTO;

import java.util.List;

public interface ReportCustom {
    List<ReportListResponseDTO> reportList(Report.Status status,Report.TargetType targetType, String searchText);
    void UpdateReportStatus(Long reportId, Report.Status Status);
}
