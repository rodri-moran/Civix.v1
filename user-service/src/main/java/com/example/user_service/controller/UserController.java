package com.example.user_service.controller;

import com.example.user_service.dtos.UserAuthDto;
import com.example.user_service.dtos.UserRequestDto;
import com.example.user_service.dtos.UserResponseDto;
import com.example.user_service.dtos.UserUpdateRequestDto;
import com.example.user_service.entity.UserEntity;
import com.example.user_service.models.User;
import com.example.user_service.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/public/register")
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody UserRequestDto dto){
        return ResponseEntity.ok(userService.createUser(dto));
    }

    @GetMapping("/admin/{userId}")
    public ResponseEntity<UserResponseDto> getUserById( @PathVariable Long userId){
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @GetMapping("/public")
    public ResponseEntity<List<UserResponseDto>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/public/{userId}")
    public ResponseEntity<UserResponseDto> updateUser(@Valid @RequestBody UserUpdateRequestDto dto, @PathVariable Long userId){
        return ResponseEntity.ok(userService.updateUser(dto, userId));
    }

    @DeleteMapping("/public/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

    @GetMapping("/public/email/{email}")
    public ResponseEntity<UserResponseDto> getByEmail(@PathVariable String email){
        return ResponseEntity.ok(userService.findByEmail(email));
    }
    @GetMapping("/public/by-email/{email}")
    public ResponseEntity<UserAuthDto> findByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.findByEmailWithPassword(email));
    }
}