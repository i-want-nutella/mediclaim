package com.Mediclaim.adminService.model;

import lombok.Getter;

@Getter

public class LoginRequest {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}