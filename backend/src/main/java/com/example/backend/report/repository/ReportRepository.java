package com.example.backend.report.repository;

import com.example.backend.entity.report.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report,Long>, ReportCustom {


}
