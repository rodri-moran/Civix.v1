package com.example.report_service.dtos;

import com.example.report_service.enums.Area;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

public class SquadResponseDTO {
    private Long id;
    private String name;
    private String description;
    private Area area;
    private Integer teamSize;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public Integer getTeamSize() {
        return teamSize;
    }

    public void setTeamSize(Integer teamSize) {
        this.teamSize = teamSize;
    }
}