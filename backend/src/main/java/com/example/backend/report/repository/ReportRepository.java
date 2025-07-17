package com.example.backend.report.repository;

import com.example.backend.entity.report.Report;
import com.example.backend.report.dto.response.UpdateReportInfoDTO;
import com.example.backend.report.dto.response.UpdateReportListDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReportRepository extends JpaRepository<Report,Long>, ReportCustom {
    @Query(" SELECT new com.example.backend.report.dto.response.UpdateReportInfoDTO" +
            " (r.targetType, r.targetId) " +
            " FROM Report r WHERE r.id = :id ")
    UpdateReportInfoDTO findReportTargetTypeAndTargetId(@Param("id") Long id);

    @Query(" SELECT new com.example.backend.report.dto.response.UpdateReportListDTO " +
            " (r.id, r.status) " +
            " FROM Report r " +
            " WHERE r.targetId = :targetId " +
            " AND r.targetType = :targetType ")
    List<UpdateReportListDTO> findListUpdateInfo(@Param("targetId") Long targetId, @Param("targetType") Report.TargetType targetType);
    
}
