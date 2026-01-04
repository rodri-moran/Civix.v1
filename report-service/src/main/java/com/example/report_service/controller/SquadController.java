package com.example.report_service.controller;
import com.example.report_service.dtos.ReportResponseDto;
import com.example.report_service.services.interfaces.ReportService;
import com.example.report_service.services.interfaces.SquadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/squad/reports")
public class SquadController {
    @Autowired
    private SquadService squadService;
    @Autowired
    private ReportService reportService;

    @GetMapping
    public ResponseEntity<List<ReportResponseDto>> getReportsForSupervisor(Authentication authentication) {
        Long supervisorUserId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(reportService.getReportsBySupervisorId(supervisorUserId));
    }
}