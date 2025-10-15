package com.example.report_service.dtos;

import com.example.report_service.enums.Status;

import java.time.LocalDateTime;

public class ReportResponseDto {
    private String title;

    private String description;

    private String address;

    private Status status;

    private LocalDateTime createdAt = LocalDateTime.now();

    private Long userId;
    private SquadResponseDTO squad;

    public SquadResponseDTO getSquad() {
        return squad;
    }

    public void setSquad(SquadResponseDTO squad) {
        this.squad = squad;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
