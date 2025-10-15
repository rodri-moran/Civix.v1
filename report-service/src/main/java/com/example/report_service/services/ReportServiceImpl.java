package com.example.report_service.services;

import com.example.report_service.dtos.ReportRequestDto;
import com.example.report_service.dtos.ReportResponseDto;
import com.example.report_service.dtos.SquadResponseDTO;
import com.example.report_service.entity.ReportEntity;
import com.example.report_service.entity.SquadEntity;
import com.example.report_service.enums.Status;
import com.example.report_service.repository.ReportRepository;
import com.example.report_service.repository.SquadRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportRepository repository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private SquadRepository squadRepository;
    @Override
    public ReportResponseDto createReport(ReportRequestDto request) {
        request.setStatus(Status.PENDING);
        ReportEntity reportEntity = modelMapper.map(request, ReportEntity.class);

        ReportEntity saved = repository.save(reportEntity);

        return modelMapper.map(saved, ReportResponseDto.class);
    }

    @Override
    public List<ReportResponseDto> getReportsByUserId(Long userId) {
        List<ReportEntity> reportEntityList = repository.getReportEntitiesByUserId(userId);
        List<ReportResponseDto> responseList = new ArrayList<>();
        for (ReportEntity r : reportEntityList){
            ReportResponseDto dto = convertEntityToDto(r);
            responseList.add(dto);
        }
        return responseList;
    }

    @Override
    public List<ReportResponseDto> getAll() {
        List<ReportEntity> reportEntityList = repository.findAll()
                .stream()
                .sorted(Comparator.comparing(ReportEntity::getStatus))
                .toList();

        return reportEntityList.stream()
                .map(this::convertEntityToDto)
                .toList();
    }

    @Override
    public ReportResponseDto deleteById(Long reportId) {
        ReportEntity reportEntity = repository.findById(reportId)
                .orElseThrow(() -> new EntityNotFoundException("Repositorio con ese id no encontrado"));
        repository.deleteById(reportId);
        return modelMapper.map(reportEntity, ReportResponseDto.class);
    }

    @Override
    public ReportResponseDto assignSquadToReport(Long reportId, Long squadId) {
        ReportEntity reportEntity = repository.findById(reportId)
                .orElseThrow(() -> new EntityNotFoundException("Report con el id " + reportId + "no encontrado"));
        SquadEntity squadEntity = squadRepository.findById(squadId)
                .orElseThrow(() -> new EntityNotFoundException("Squad con el id " + squadId + " no encontrado"));

        reportEntity.setSquad(squadEntity);
        squadEntity.getReports().add(reportEntity);

        reportEntity = repository.save(reportEntity);
        squadEntity = squadRepository.save(squadEntity);

        SquadResponseDTO squadResponse = modelMapper.map(squadEntity, SquadResponseDTO.class);
        ReportResponseDto response = modelMapper.map(reportEntity, ReportResponseDto.class);

        response.setSquad(squadResponse);
        return response;
    }

    @Override
    public ReportResponseDto getById(Long id) {
        ReportEntity entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Report con el id " + id + " no encontrado."));
        return modelMapper.map(entity, ReportResponseDto.class);
    }

    private ReportResponseDto convertEntityToDto (ReportEntity entity){
        return modelMapper.map(entity, ReportResponseDto.class);
    }
}
