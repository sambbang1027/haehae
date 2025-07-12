package com.example.backend.report.controller;

import com.example.backend.entity.report.Report;
import com.example.backend.report.dto.response.ReportListDTO;
import com.example.backend.report.service.ReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/report")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("list")
    public ResponseEntity<List<ReportListDTO>> list(@RequestParam Report.Status status,
                                              @RequestParam Report.TargetType targetType,
                                              @RequestParam(required = false) String searchText){
        List<ReportListDTO> list = reportService.reportList(status,targetType,searchText);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
