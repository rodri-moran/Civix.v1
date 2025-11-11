package com.example.report_service.repository;

import com.example.report_service.entity.ReportEntity;
import com.example.report_service.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {
    List<ReportEntity> getReportEntitiesByUserId(Long userId);
    List<ReportEntity> findByStatus(Status status);
}
