package com.Mediclaim.adminService.Service;

import com.Mediclaim.adminService.model.Admin;
import com.Mediclaim.adminService.model.LoginRequest;
import com.Mediclaim.adminService.repo.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminLoginService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Admin Authentication
    public String login(LoginRequest loginReq) {
        Admin admin = adminRepository.findByUsername(loginReq.getUsername());
        if (admin == null) {
            return "Admin not found";
        }
        if (passwordEncoder.matches(loginReq.getPassword(), admin.getPassword())) {
            // Reset failed attempts on successful login
            return "Login successful!";
        }
        return "Invalid UserName or Password";
    }

    // Add a new Admin (Optional, for initial setup or creating more admins)
    public Admin addAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }
}
