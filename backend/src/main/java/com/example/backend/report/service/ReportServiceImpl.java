package com.example.backend.report.service;

import com.example.backend.entity.report.Report;
import com.example.backend.report.dto.request.ReportInsertRequestDTO;
import com.example.backend.report.dto.response.ReportListDTO;
import com.example.backend.report.dto.response.ReportListResponseDTO;
import com.example.backend.report.dto.response.UpdateReportInfoDTO;
import com.example.backend.report.dto.response.UpdateReportListDTO;
import com.example.backend.report.repository.ReportRepository;
import jakarta.transaction.Transactional;
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

    @Override
    public void registerReport(ReportInsertRequestDTO reportInsertRequestDTO) {
        reportRepository.save(reportInsertRequestDTO.toEntity());
    }


    // 1. id로 조회
    // 2. 타겟대상과, 타켓 타입을 가져온다. 
    // 3. 해당 다켓대상과 타켓타입을 가진 리스트 모두 업데이트
    @Transactional
    @Override
    public UpdateReportInfoDTO updateReport(Long id, Report.Status status) {
        UpdateReportInfoDTO updateReportInfo = reportRepository.findReportTargetTypeAndTargetId(id);
        Long targetId = updateReportInfo.getTargetId();
        Report.TargetType targetType = updateReportInfo.getTargetType();

        List<UpdateReportListDTO> listDTO =  reportRepository.findListUpdateInfo(targetId,targetType);

        for(UpdateReportListDTO updateInfoDTO : listDTO){
            if(updateInfoDTO.getStatus() == Report.Status.PENDING) {
                reportRepository.UpdateReportStatus(updateInfoDTO.getId(), status);
            }
        }
        return updateReportInfo;
    }
}
