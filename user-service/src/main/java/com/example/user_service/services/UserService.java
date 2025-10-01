package com.example.user_service.services;

import com.example.user_service.dtos.UserAuthDto;
import com.example.user_service.dtos.UserRequestDto;
import com.example.user_service.dtos.UserResponseDto;
import com.example.user_service.dtos.UserUpdateRequestDto;
import com.example.user_service.models.User;
import com.example.user_service.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    UserResponseDto createUser(UserRequestDto dto);
    UserResponseDto getUserById(Long userId);
    List<UserResponseDto> getAllUsers();
    UserResponseDto updateUser(UserUpdateRequestDto dto, Long userId);
    UserResponseDto deleteUser(Long idUser);
    UserResponseDto findByEmail(String email);
    UserAuthDto findByEmailWithPassword(String email);
}
