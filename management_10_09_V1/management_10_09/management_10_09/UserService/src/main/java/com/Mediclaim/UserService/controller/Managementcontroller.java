package com.Mediclaim.UserService.controller;

import com.Mediclaim.UserService.model.LoginRequest;
import com.Mediclaim.UserService.model.User;

import com.Mediclaim.UserService.srvc.usrsrvc1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

public class Managementcontroller {

    @Autowired
    private usrsrvc1 userService;

    @GetMapping("/")
    public  String welcome(){
        return "Medi_claim User Service Page";
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(
            @RequestParam("email") String email,
            @RequestParam("password") String password) {

        // Create a new LoginRequest object with the request parameters
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail(email);
        loginRequest.setPassword(password);

        String response = userService.login(loginRequest);

        if (response.contains("Login successful!")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }

    @GetMapping("/unlock-account")
    public ResponseEntity<String> unlockAccount(@RequestParam("token") String token) {
        String result = userService.verifyUnlockToken(token);

        if (result.equals("Account unlocked successfully!")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(400).body(result);
        }
    }


    @PostMapping("/reg")
    public ResponseEntity<String> register(@RequestBody User user) {
        System.out.println("Registration attempt for email: " + user.getEmail());
        userService.registerUser(user);
        return ResponseEntity.ok("Registration successful. Please check your email for verification.");
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verify(@RequestParam("token") String token) {
        if (userService.verifyUser(token)) {
            return ResponseEntity.ok("Email verified successfully.");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired verification token.");
        }
    }

    @GetMapping("/user")
    public User userdata(@RequestParam String email) {
        return (userService.userdata(email));

    }
}
