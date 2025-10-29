package com.example.user_service.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Desactivar CSRF (para API REST)
                .csrf(csrf -> csrf.disable())

                // CORS deshabilitado (lo maneja el gateway)
                .cors(cors -> cors.disable())

                .authorizeHttpRequests(auth -> auth
                        // Endpoints públicos
                        .requestMatchers("/api/users/public", "/api/users/public/**").permitAll()

                        // Endpoints solo admin
                        .requestMatchers("/api/users/admin/**").hasRole("ADMIN")

                        // Endpoints para usuarios autenticados
                        .requestMatchers("/api/users/**").hasAnyRole("USER", "ADMIN")

                        // Cualquier otra request requiere autenticación
                        .anyRequest().authenticated()
                )

                // Agregar filtro JWT para validar token antes del UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)

                .build();
    }


}
