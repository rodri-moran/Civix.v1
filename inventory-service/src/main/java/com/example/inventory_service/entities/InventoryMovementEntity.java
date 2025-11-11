package com.example.inventory_service.entities;

import com.example.inventory_service.enums.TypeMovement;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

//Guarda el historial de movimientos (entrada/salida/consumo)
@Entity
@Table(name = "inventory_movements")
public class InventoryMovementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "resource_id")
    private ResourceEntity resource;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeMovement typeMovement;
    @Column(nullable = false)
    private Integer quantity;
    @Column(nullable = false, updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssXXX")
    private OffsetDateTime date = OffsetDateTime.now();
    @Column(name = "user_id", nullable = false)
    private Long userId; // quien registró el movimiento (admin, responsable, etc.)
    @Column(name = "report_id")
    private Long reportId;
    @Column(length = 255)
    private String reason;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ResourceEntity getResource() {
        return resource;
    }

    public void setResource(ResourceEntity resource) {
        this.resource = resource;
    }

    public TypeMovement getTypeMovement() {
        return typeMovement;
    }

    public void setTypeMovement(TypeMovement typeMovement) {
        this.typeMovement = typeMovement;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public OffsetDateTime getDate() {
        return date;
    }

    public void setDate(OffsetDateTime date) {
        this.date = date;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}