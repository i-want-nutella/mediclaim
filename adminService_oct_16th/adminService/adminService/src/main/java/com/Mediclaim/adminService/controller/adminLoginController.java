package com.Mediclaim.adminService.controller;



import com.Mediclaim.adminService.model.Admin;
import com.Mediclaim.adminService.Service.AdminLoginService;
import com.Mediclaim.adminService.model.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class adminLoginController {

    @Autowired
    private AdminLoginService adminService;

    @GetMapping("/")
    public String adminserv(){return"Admin Management";}


    // Admin login endpoint
    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        String response = adminService.login(loginRequest);

        if (response.equals("Login successful!")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }

    // (Optional) Endpoint to add new admin users
    @PostMapping("/add")
    public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin) {
        Admin newAdmin = adminService.addAdmin(admin);
        return ResponseEntity.ok(newAdmin);
    }
}
