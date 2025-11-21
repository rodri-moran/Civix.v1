package com.example.inventory_service.services;
import com.example.inventory_service.configs.JwtUtil;
import com.example.inventory_service.dtos.*;
import com.example.inventory_service.entities.InventoryMovementEntity;
import com.example.inventory_service.entities.ResourceEntity;
import com.example.inventory_service.enums.Area;
import com.example.inventory_service.enums.TypeMovement;
import com.example.inventory_service.repositories.MovementRepository;
import com.example.inventory_service.repositories.ResourceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class InventoryServiceImpl implements InventoryService{
    private final MovementRepository inventoryRepository;
    private final ResourceRepository resourceRepository;
    private final ModelMapper mapper;
    private final WebClient userClient;
    private final JwtUtil jwtUtil;


    public InventoryServiceImpl(
            MovementRepository inventoryRepository,
            ResourceRepository resourceRepository,
            ModelMapper mapper,
            WebClient.Builder builder,
            JwtUtil jwtUtil
    ) {
        this.inventoryRepository = inventoryRepository;
        this.resourceRepository = resourceRepository;
        this.mapper = mapper;
        this.jwtUtil = jwtUtil;
        this.userClient = builder
                .baseUrl("http://user-service:8081/api/users")
                .build();
    }
    @Override
    public List<ResourceDto> getAllResources() {
        return resourceRepository.findByActiveTrue().
                stream()
                .map(x -> mapper.map(x, ResourceDto.class))
                .collect(Collectors.toList());
    }
    @Override
    public ResourceCreateDto createResource(ResourceCreateDto dto) {
        ResourceEntity resourceEntity = mapper.map(dto, ResourceEntity.class);
        ResourceEntity saved = resourceRepository.save(resourceEntity);
        return mapper.map(saved, ResourceCreateDto.class);
    }
    @Override
    public ResourceCreateDto updateResource(Long id, ResourceCreateDto dto) {
        ResourceEntity resourceEntity = resourceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recurso con el id "+ id +" no encontrado"));
        resourceEntity.setName(dto.getName());
        resourceEntity.setDescription(dto.getDescription());
        resourceEntity.setStock(dto.getStock());
        resourceEntity.setUnit(dto.getUnit());
        resourceEntity.setArea(dto.getArea());

        ResourceEntity saved = resourceRepository.save(resourceEntity);
        return mapper.map(saved, ResourceCreateDto.class);
    }
    @Override
    public ResourceCreateDto deleteResource(Long id) {
        ResourceEntity resourceEntity = resourceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recurso con el id "+ id +" no encontrado"));
        resourceEntity.setActive(false);
        resourceRepository.save(resourceEntity);
        return mapper.map(resourceEntity, ResourceCreateDto.class);
    }
    @Override
    public InventoryMovementDto registerMovement(InventoryMovementDto dto) {

        // Validación: la lista de movimientos no puede estar vacía
        if (dto.getMovementDetail() == null || dto.getMovementDetail().isEmpty()) {
            throw new IllegalArgumentException("Debe especificar al menos un recurso en el movimiento de inventario");
        }

        // Recorremos cada item del detalle
        for (ItemMovementDetailDto item : dto.getMovementDetail()) {

            //Buscar el recurso correspondiente
            ResourceEntity resourceEntity = resourceRepository.findById(item.getResourceId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Recurso con el id " + item.getResourceId() + " no encontrado"));
            //Validar stock si es una salida
            if (dto.getTypeMovement().equals(TypeMovement.SALIDA)) {
                resourceEntity.setStock(resourceEntity.getStock() - item.getQuantity());
            }
            // Si es entrada, sumar al stock
            else if (dto.getTypeMovement().equals(TypeMovement.ENTRADA)) {
                resourceEntity.setStock(resourceEntity.getStock() + item.getQuantity());
            }
            //Crear y registrar el movimiento individual
            InventoryMovementEntity movement = new InventoryMovementEntity();
            movement.setResource(resourceEntity);
            movement.setTypeMovement(dto.getTypeMovement());
            movement.setQuantity(item.getQuantity());
            movement.setUserId(dto.getUserId());
            movement.setReason(dto.getReason());
            movement.setReportId(dto.getReportId());

            // Guardar cambios en DB
            resourceRepository.save(resourceEntity);
            inventoryRepository.save(movement);
        }

        // Devolver el mismo DTO recibido
        return dto;
    }
    @Override
    public List<ResourceCreateDto> getResourcesByArea(Area area) {
        List<ResourceCreateDto> list = resourceRepository.findByArea(area)
                .stream()
                .map(x -> mapper.map(x, ResourceCreateDto.class))
                .collect(Collectors.toList());
        return list;
    }
    @Override
    public List<InventoryMovementResponseDto> getAllMovements() {
        List<InventoryMovementResponseDto> responseList = new ArrayList<>();
        List<InventoryMovementEntity> entityList = inventoryRepository.findAll();
        for (InventoryMovementEntity movement : entityList) {
            System.out.println("Movement justo despues del for: " + movement);
            UserDto user = null;

            try {
                String token = jwtUtil.generateServiceToken();

                user = userClient.get()
                        .uri("/admin/{id}", movement.getUserId())
                        .header("Authorization","Bearer " + token)
                        .retrieve()
                        .bodyToMono(UserDto.class)
                        .block();
                System.out.println("Usuario: " + user);
            } catch (Exception e) {
                System.out.println("Error buscando usuario con id = " + movement.getUserId());
                e.printStackTrace();

            }

            InventoryMovementResponseDto dto = mapper.map(movement, InventoryMovementResponseDto.class);

            if (user != null) {
                dto.setUserName(user.getName());
            } else {
                dto.setUserName("Usuario desconocido");
            }
            responseList.add(dto);
        }
        return responseList;
    }
}