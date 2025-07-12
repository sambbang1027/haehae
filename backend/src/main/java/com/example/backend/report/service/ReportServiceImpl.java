package com.example.backend.report.service;

import com.example.backend.entity.report.Report;
import com.example.backend.report.dto.response.ReportListResponseDTO;
import com.example.backend.report.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportServiceImpl implements ReportService{
    private final ReportRepository reportRepository;

    public ReportServiceImpl(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    @Override
    public ReportListResponseDTO reportList(Report.Status status, Report.TargetType targetType, String searchText) {
       List<ReportListResponseDTO> dtoList=  reportRepository.reportList(status,targetType,searchText);



        return null;
    }
}
