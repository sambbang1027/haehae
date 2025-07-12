package com.example.backend.report.service;

import com.example.backend.entity.report.Report;
import com.example.backend.report.dto.response.ReportListDTO;
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
    public List<ReportListDTO> reportList(Report.Status status, Report.TargetType targetType, String searchText) {
       List<ReportListResponseDTO> dtoList=  reportRepository.reportList(status,targetType,searchText);

        List<ReportListDTO>  reportListDTO = dtoList.stream().map(dto ->{
            String reasonCode =
                    switch (dto.getReasonCode().intValue()){
                        case 1 -> "스팸홍보/도배글입니다.";
                        case 2 -> "음란물 또는 불법 촬영물입니다.";
                        case 3 -> "불법 정보를 포함하고 있습니다.";
                        case 4 -> "청소년에게 유해한 내용입니다.";
                        case 5 -> "욕설/생명경시/혐오/차별적 표현입니다.";
                        case 6 -> "개인정보 노출 게시물입니다.";
                        case 7 -> "불쾌한 표현이 있습니다.";
                        case 8 -> "명예훼손 또는 저작권 침해되었습니다.";
                        default -> "알 수 없는 신고 사유입니다.";
                    };
            return new ReportListDTO(
                    dto.getId(),
                    dto.getReporterId(),
                    reasonCode,
                    dto.getDetails()
            );
        }).toList();

        return reportListDTO;
    }
}
