package com.example.report_service.controller;
import com.example.report_service.dtos.NewDto;
import com.example.report_service.dtos.NewResponseDto;
import com.example.report_service.services.interfaces.NewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@RequestMapping("/api/new")
public class NewController {
    @Autowired
    private NewService service;

    @PostMapping("/admin")
    public ResponseEntity<NewResponseDto> createNew(NewDto dto){
        return ResponseEntity.ok(service.createNew(dto));
    }
    @GetMapping("/admin")
    public ResponseEntity<List<NewResponseDto>> getAllNews(){
        return ResponseEntity.ok(service.getAllNews());
    }
}