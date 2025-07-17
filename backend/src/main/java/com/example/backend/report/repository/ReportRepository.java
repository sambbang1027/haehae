package com.example.backend.report.repository;

import com.example.backend.entity.report.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface ReportRepository extends JpaRepository<Report,Long>, ReportCustom {
    @Query(" SELECT r FROM Report r WHERE r.id = :id ")
            Report findReportTargetTypeAndTargetId(@Param("id") Long id);


    
}
