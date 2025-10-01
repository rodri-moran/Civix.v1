package com.example.auth_service.services;

import com.example.auth_service.configs.JwtUtil;
import com.example.auth_service.dtos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class AuthenticationService {

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponseDto login(LoginRequestDto dto) {

        //TODO CAMBIAR AL FINALIZAR PRODUCCIÓN
        UserResponseDto user = webClientBuilder.build()
                .get()
                .uri("http://localhost:8081/api/users/public/by-email/{email}", dto.getEmail())
                .retrieve()
                .bodyToMono(UserResponseDto.class)
                .block();

        if (user == null || !passwordEncoder.matches(dto.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return new AuthResponseDto(token, user.getRole().name());
    }

    public AuthResponseDto register(RegisterRequestDto request){
        UserResponseDto user = webClientBuilder.build()
                .post()
                .uri("http://localhost:8081/api/users/public/register")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(UserResponseDto.class)
                .block();
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return new AuthResponseDto(token, user.getRole().name());
    }

}