package com.example.backend.report.service;

import com.example.backend.entity.report.Report;
import com.example.backend.report.dto.response.ReportListDTO;
import com.example.backend.report.dto.response.ReportListResponseDTO;

import java.util.List;

public interface ReportService {
    List<ReportListDTO> reportList(Report.Status status, Report.TargetType targetType, String searchText);
}
