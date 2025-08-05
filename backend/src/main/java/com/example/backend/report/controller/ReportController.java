package com.example.backend.report.controller;

import com.example.backend.entity.report.Report;
import com.example.backend.report.dto.request.ReportInsertRequestDTO;
import com.example.backend.report.dto.response.ReportListDTO;
import com.example.backend.report.service.ReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/report")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<ReportListDTO>> list(@RequestParam Report.Status status,
                                              @RequestParam Report.TargetType targetType,
                                              @RequestParam(required = false) String searchText){
        List<ReportListDTO> list = reportService.reportList(status,targetType,searchText);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/submit")
    public ResponseEntity<String> registerReport(@RequestBody ReportInsertRequestDTO dto){
        reportService.registerReport(dto);
        return new ResponseEntity<>("해당 글에 신고처리 되셨습니다.",HttpStatus.OK);
    }
}
