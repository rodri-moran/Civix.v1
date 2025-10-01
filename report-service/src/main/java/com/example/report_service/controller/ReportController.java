package com.example.report_service.controller;

import com.example.report_service.dtos.ReportRequestDto;
import com.example.report_service.dtos.ReportResponseDto;
import com.example.report_service.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @PostMapping("/public")
    public ResponseEntity<ReportResponseDto> createReport(@RequestBody ReportRequestDto dto){
        return ResponseEntity.ok(reportService.createReport(dto));
    }

    @GetMapping("/public/get-by-user-id/{userId}")
    public ResponseEntity<List<ReportResponseDto>> getReportsByUserId(@PathVariable Long userId){
        return ResponseEntity.ok(reportService.getReportsByUserId(userId));
    }
}