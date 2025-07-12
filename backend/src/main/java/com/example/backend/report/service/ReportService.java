package com.example.backend.report.service;

import com.example.backend.entity.report.Report;
import com.example.backend.report.dto.response.ReportListResponseDTO;

public interface ReportService {
    ReportListResponseDTO reportList(Report.Status status, Report.TargetType targetType, String searchText);
}
