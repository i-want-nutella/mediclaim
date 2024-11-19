package com.Mediclaim.UserService.srvc;

import com.Mediclaim.UserService.Repo.NomineeRepo;
import com.Mediclaim.UserService.Repo.UserRepo;
import com.Mediclaim.UserService.model.LoginRequest;
import com.Mediclaim.UserService.model.Nominee;
import com.Mediclaim.UserService.model.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class usrsrvc1 {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private NomineeRepo nomineeRepository;

    @Autowired
    private JavaMailSender mailSender;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    @Transactional
    public void registerUser(User user) {
        user.setEnabled(false);
        // Directly set the password without encoding
        user.setPassword(encoder.encode(user.getPassword()));
        // Note: Directly storing plain text passwords is not secure
        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);
        user.setTokenExpiryDate(LocalDateTime.now().plusHours(1));
        userRepository.save(user);
        sendVerificationEmail(user, token);
    }

    private void sendVerificationEmail(User user, String token) {
        String verificationUrl = "http://localhost:8081/verify?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Verify your email address");
        message.setText("your User Id is:"+user.getUser_id()+"To verify your email address, please click the following link: " + verificationUrl);

        mailSender.send(message);
    }

    public boolean verifyUser(String token) {
        User user = userRepository.findByVerificationToken(token);
        if (user == null || user.getTokenExpiryDate().isBefore(LocalDateTime.now())) {
            return false;
        }

        user.setEnabled(true);
        user.setVerificationToken(null);
        user.setTokenExpiryDate(null);
        userRepository.save(user);
        return true;
    }

    // Max allowed failed attempts
    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final long TOKEN_EXPIRATION_MINUTES = 15;

    public String login(LoginRequest loginRequest) {
        // Find the user by email
        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user == null) {
            return "User Not Found";
        }

        // Check if the user is locked
        if (!user.getEnabled()) {
            return "Account is locked due to too many failed login attempts or Unverified, Please verify..";
        }

        // Compare the input password with the stored hashed password
        if (encoder.matches(loginRequest.getPassword(), user.getPassword())) {
            // Reset failed attempts on successful login
            resetFailedAttempts(user);
            return "Login successful! ";
        } else {
            // Increment failed attempts and handle account lock if exceeded max attempts
            incrementFailedAttempts(user);
            if (user.getFailedAttempts() >= MAX_FAILED_ATTEMPTS) {
                lockAccount(user);
                return "Account is locked due to too many failed login attempts. Please contact support.";
            }
            return "Invalid email or password.";
        }
    }
    private  void resetFailedAttempts(User user) {
        user.setFailedAttempts(0);
        user.setLastFailedAttempt(null);  // Reset the last failed attempt
        userRepository.save(user);
    }

    private void incrementFailedAttempts(User user) {
        int newFailedAttempts = user.getFailedAttempts() + 1;
        user.setFailedAttempts(newFailedAttempts);
        user.setLastFailedAttempt(LocalDateTime.now());
        userRepository.save(user);
    }

    private void lockAccount(User user) {

        user.setEnabled(false);
        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);
        user.setTokenExpiryDate(LocalDateTime.now().plusMinutes(TOKEN_EXPIRATION_MINUTES));
        userRepository.save(user);

        // Send email with unlock token
        String unlockLink = "http://localhost:8081/unlock-account?token=" + token;
        sendUnlockEmail(user.getEmail(), unlockLink);
    }

    public void sendUnlockEmail(String recipientEmail, String unlockLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Unlock Your Account");
        message.setText("Click the link to unlock your account: " + unlockLink);

        mailSender.send(message);
    }

    public String verifyUnlockToken(String token) {
        User user = userRepository.findByVerificationToken(token);

        if (user == null) {
            return "Invalid unlock token.";
        }

        if (user.getTokenExpiryDate().isBefore(LocalDateTime.now())) {
            return "Unlock token has expired.";
        }

        // Unlock the account
        user.setEnabled(true);
        user.setFailedAttempts(0); // Reset failed attempts
        user.setVerificationToken(null); // Clear the token after use
        user.setTokenExpiryDate(null);  // Clear the expiry date
        userRepository.save(user);

        return "Account unlocked successfully!";
    }

    public User userdata(String email) {
        // Find the user by email
        return (userRepository.findByEmail(email));
    }
}




