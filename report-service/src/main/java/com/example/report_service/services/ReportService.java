package com.example.report_service.services;

import com.example.report_service.dtos.ReportRequestDto;
import com.example.report_service.dtos.ReportResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReportService {
    ReportResponseDto createReport(ReportRequestDto request);
    List<ReportResponseDto> getReportsByUserId(Long userId);
    List<ReportResponseDto> getAll();
    ReportResponseDto deleteById(Long userId);
    ReportResponseDto assignSquadToReport(Long reportId, Long squadId);
    ReportResponseDto getById(Long id);
}
