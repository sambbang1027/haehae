package com.example.backend.report.service;

import com.example.backend.entity.report.Report;
import com.example.backend.report.dto.request.ReportInsertRequestDTO;
import com.example.backend.report.dto.response.ReportListDTO;
import com.example.backend.report.dto.response.ReportListResponseDTO;

import java.util.List;

public interface ReportService {
    List<ReportListDTO> reportList(Report.Status status, Report.TargetType targetType, String searchText);
    void registerReport(ReportInsertRequestDTO reportInsertRequestDTO);
    void updateReport(Long Id);
}
