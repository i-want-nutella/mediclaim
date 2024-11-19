package com.Mediclaim.UserService.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String mobileNum;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean enabled;

    @Column(name = "verification_token")
    private String verificationToken;

    @Column(name = "token_expiry_date")
    private LocalDateTime tokenExpiryDate;

    @Column(name = "failed_attempts")
    private int failedAttempts;

    @Column(name = "last_failed_attempt")
    private LocalDateTime lastFailedAttempt;


    public boolean getEnabled() {
        return this.enabled;
    }
}
