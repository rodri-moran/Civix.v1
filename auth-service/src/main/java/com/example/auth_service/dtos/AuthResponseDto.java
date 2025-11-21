package com.example.auth_service.dtos;

public class AuthResponseDto {
    private String token;
    private String role;
    private Long userId;
    private String name;
    private String lastName;


    public AuthResponseDto(String token, String role, Long userId, String name, String lastName){
        this.token = token;
        this.role = role;
        this.userId = userId;
        this.name = name;
        this.lastName = lastName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
