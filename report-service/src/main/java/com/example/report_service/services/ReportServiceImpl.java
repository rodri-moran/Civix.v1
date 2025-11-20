package com.example.report_service.services;

import com.example.report_service.dtos.ReportRequestDto;
import com.example.report_service.dtos.ReportResponseDto;
import com.example.report_service.dtos.ResourcesUsedDto;
import com.example.report_service.dtos.SquadResponseDTO;
import com.example.report_service.entity.ReportEntity;
import com.example.report_service.entity.ReportStatusHistoryEntity;
import com.example.report_service.entity.SquadEntity;
import com.example.report_service.enums.Status;
import com.example.report_service.repository.HistoryRepository;
import com.example.report_service.repository.ReportRepository;
import com.example.report_service.repository.SquadRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.OffsetDateTime;
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
    @Autowired
    private WebClient.Builder webClientBuilder;
    @Autowired
    private HistoryRepository historyRepository;
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
        System.out.println("llegó al service con el reportId: " + reportId + " y el squadId: " + squadId);
        ReportEntity reportEntity = repository.findById(reportId)
                .orElseThrow(() -> new EntityNotFoundException("Report con el id " + reportId + "no encontrado"));
        SquadEntity squadEntity = squadRepository.findById(squadId)
                .orElseThrow(() -> new EntityNotFoundException("Squad con el id " + squadId + " no encontrado"));
        System.out.println("pasó los primeros dos filtros");
        reportEntity.setSquad(squadEntity);
        reportEntity.setStatus(Status.IN_PROCESS);
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

    @Override
    public List<ReportResponseDto> getReportsByStatus(String status) {
        Status enumStatus = Status.valueOf(status.toUpperCase());
        return repository.findByStatus(enumStatus)
                .stream()
                .map(x -> modelMapper.map(x, ReportResponseDto.class))
                .toList();
    }

    @Override
    public ReportResponseDto updateReportStatus(Long reportId, Status status, ResourcesUsedDto resourcesUsed) {
        ReportEntity entity = repository.findById(reportId)
                .orElseThrow( () -> new EntityNotFoundException("Report con el id " + reportId + " no encontrado"));

        if(status.equals(Status.RESOLVED)){
            sendResourcesUsedToInventoryService(resourcesUsed);
            entity.setResolvedAt(OffsetDateTime.now());
        } else {
            entity.setResolvedAt(null);
        }


        ReportStatusHistoryEntity history = new ReportStatusHistoryEntity();
        history.setReport(entity);
        history.setOldStatus(entity.getStatus());
        history.setNewStatus(status);

        historyRepository.save(history);

        entity.setStatus(status);
        repository.save(entity);
        return modelMapper.map(entity, ReportResponseDto.class);
    }
    public void sendResourcesUsedToInventoryService(ResourcesUsedDto dto){
        webClientBuilder.build()
                .post()
                .uri("http://localhost:8084/api/inventory/admin/movements")
                .bodyValue(dto)
                .retrieve()
                .bodyToMono(Void.class)
                .subscribe();
    }
//    UserResponseDto user = webClientBuilder.build()
//            .get()
//            .uri("http://user-service:8081/api/users/public/by-email/{email}", dto.getEmail())
//            .retrieve()
//            .bodyToMono(UserResponseDto.class)
//            .block();

    private ReportResponseDto convertEntityToDto (ReportEntity entity){
        return modelMapper.map(entity, ReportResponseDto.class);
    }
}
