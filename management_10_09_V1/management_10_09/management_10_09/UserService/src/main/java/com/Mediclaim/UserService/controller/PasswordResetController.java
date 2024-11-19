package com.Mediclaim.UserService.controller;

import com.Mediclaim.UserService.srvc.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/password")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/forgot")
    public String forgotPassword(@RequestParam("email") String email) {
        System.out.println(email);
        boolean success = passwordResetService.sendPasswordResetLink(email);
        return success ? "Password Verification token sent to mail!" : "User not found with the provided email.";
    }

    @PostMapping("/reset")
    public String resetPassword(@RequestParam("token") String token,@RequestParam("password") String password) {
        boolean success = passwordResetService.resetPassword(token, password);
        return success ? "Password reset successful!" : "Invalid or expired token.";
    }

    @PostMapping("/update")
    public String updatePassword(@RequestParam("email") String email,@RequestParam("New_Password") String New_Password) {
        boolean success = passwordResetService.updatePassword(email, New_Password);
        return success ? "Password Updated successfully!" : "Invalid User Name or Password Details.";
    }
}
