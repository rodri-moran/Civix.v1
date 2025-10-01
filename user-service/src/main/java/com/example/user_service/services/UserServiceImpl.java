package com.example.user_service.services;

import com.example.user_service.dtos.UserAuthDto;
import com.example.user_service.dtos.UserRequestDto;
import com.example.user_service.dtos.UserResponseDto;
import com.example.user_service.dtos.UserUpdateRequestDto;
import com.example.user_service.entity.UserEntity;
import com.example.user_service.enums.Role;
import com.example.user_service.models.User;
import com.example.user_service.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDto createUser(UserRequestDto dto) {
        if(userRepository.existsByEmail(dto.getEmail())){
            throw new IllegalArgumentException("El email ya está registrado");
        }
        UserEntity userEntity = modelMapper.map(dto, UserEntity.class);
        userEntity.setRegistrationDate(LocalDate.now());


        //se hashear la contraseña antes de guardar
        userEntity.setPasswordHash(passwordEncoder.encode(dto.getPasswordHash()));

        UserEntity saved = userRepository.save(userEntity);
        return modelMapper.map(saved, UserResponseDto.class);
    }

    @Override
    public UserResponseDto getUserById(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario con id " + userId + " no encontrado"));

        return modelMapper.map(user, UserResponseDto.class);

    }

    @Override
    public List<UserResponseDto> getAllUsers() {
       return userRepository.findAll()
               .stream()
               .map(x -> modelMapper.map(x, UserResponseDto.class)).toList();
    }

    @Override
    public UserResponseDto updateUser(UserUpdateRequestDto dto, Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario con id " + userId + " no encontrado"));

        modelMapper.map(dto, user);

        UserEntity updatedUser = userRepository.save(user);

        return modelMapper.map(updatedUser, UserResponseDto.class);
    }

    @Override
    public UserResponseDto deleteUser(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario con id " + userId + " no encontrado"));
        userRepository.delete(user);

        return modelMapper.map(user, UserResponseDto.class);
    }

    @Override
    public UserResponseDto findByEmail(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return modelMapper.map(user, UserResponseDto.class);
    }

    @Override
    public UserAuthDto findByEmailWithPassword(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        UserAuthDto dto = new UserAuthDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setPasswordHash(user.getPasswordHash());
        return dto;
    }


}
