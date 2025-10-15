package com.example.report_service.services;

import com.example.report_service.dtos.SquadRequestDTO;
import com.example.report_service.dtos.SquadResponseDTO;
import com.example.report_service.entity.SquadEntity;
import com.example.report_service.repository.SquadRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Primary
public class SquadServiceImpl implements SquadService{
    @Autowired
    private SquadRepository repo;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public SquadResponseDTO createSquad(SquadRequestDTO dto) {
        SquadEntity squadEntity = modelMapper.map(dto, SquadEntity.class);
        SquadEntity saved = repo.save(squadEntity);
        return modelMapper.map(saved, SquadResponseDTO.class);
    }

    @Override
    public List<SquadResponseDTO> getAll() {
        return repo.findAll().stream()
                .map(x -> modelMapper.map(x, SquadResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public SquadResponseDTO deleteById(Long id) {
        SquadEntity squadEntity = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Squad con el id: " + id + " no encontrado"));
        repo.deleteById(id);
        return modelMapper.map(squadEntity, SquadResponseDTO.class);
    }

    @Override
    public SquadResponseDTO getById(Long id) {
        SquadEntity squadEntity = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Squad con el id: " + id + " no encontrado"));
        return modelMapper.map(squadEntity, SquadResponseDTO.class);
    }
}