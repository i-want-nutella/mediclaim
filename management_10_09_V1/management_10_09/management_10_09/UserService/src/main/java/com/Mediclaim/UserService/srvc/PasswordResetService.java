package com.Mediclaim.UserService.srvc;

import com.Mediclaim.UserService.Repo.UserRepo;
import com.Mediclaim.UserService.model.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.support.NullValue;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private JavaMailSender mailSender;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public boolean sendPasswordResetLink(String email) {
        User userid= userRepository.findByEmail(email);
        if (userid==null) {
            return false; // User not found
        }

        User user = userid;
        String resetToken = UUID.randomUUID().toString();
        user.setVerificationToken(resetToken);
        user.setTokenExpiryDate(LocalDateTime.now().plusHours(1)); // Token valid for 1 hour
        userRepository.save(user);

        sendPasswordResetEmail(user,resetToken);
        return true;
    }

    private void sendPasswordResetEmail(User user, String token) {
        String reset_token = "token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Password Reset Request");
        message.setText("Please enter Sent verification token along with new password in reset page to reset your password,Your Security is our Priority....RESET_TOKEN:-" + reset_token);

        mailSender.send(message);
    }

    public boolean resetPassword(String token, String newPassword) {
        User userOpt = userRepository.findByVerificationToken(token);
        User user = userOpt;
        user.setPassword(encoder.encode(newPassword));
        user.setVerificationToken(null); // Clear token after password reset
        user.setTokenExpiryDate(null);
        userRepository.save(user);
        return true;
    }

    public boolean updatePassword(String email, String newPassword) {
        User userid= userRepository.findByEmail(email);
        if (userid==null) {
            return false; // User not found
        }
        User user = userid;
        user.setPassword(encoder.encode(newPassword));
        user.setVerificationToken(null); // Clear token after password reset
        user.setTokenExpiryDate(null);
        userRepository.save(user);
        return true;
    }
}
