package com.example.user_service.services;

import com.example.user_service.dtos.*;
import com.example.user_service.entity.UserEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    UserResponseDto createUser(UserRequestDto dto);
    UserResponseDto getUserById(Long userId);
    List<UserResponseDto> getAllUsers();
    UserResponseDto updateUser(UserUpdateDto dto, Long userId);
    UserResponseDto deleteUser(Long idUser);
    UserResponseDto findByEmail(String email);
    UserAuthDto findByEmailWithPassword(String email);
    UserDto getProfile(String token);
    UserDto updateProfile(String token, UserUpdateDto dto);
}