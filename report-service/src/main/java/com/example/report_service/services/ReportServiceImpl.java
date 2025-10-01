package com.example.report_service.services;

import com.example.report_service.dtos.ReportRequestDto;
import com.example.report_service.dtos.ReportResponseDto;
import com.example.report_service.entity.ReportEntity;
import com.example.report_service.repository.ReportRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportRepository repository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public ReportResponseDto createReport(ReportRequestDto request) {
        ReportEntity reportEntity = modelMapper.map(request, ReportEntity.class);

        ReportEntity saved = repository.save(reportEntity);

        return modelMapper.map(saved, ReportResponseDto.class);
    }
}
