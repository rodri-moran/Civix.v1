package com.example.report_service.repository;

import com.example.report_service.entity.SquadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SquadRepository extends JpaRepository<SquadEntity, Long> {
}
