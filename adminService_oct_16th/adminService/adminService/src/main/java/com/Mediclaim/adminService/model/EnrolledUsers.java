package com.Mediclaim.adminService.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "enrolled_users")
public class EnrolledUsers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically generate the ID
    private Long id;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "policy_name", nullable = false)
    private String policyName;

    @Column(name = "amount_remaining", nullable = false)
    private double amountRemaining;

    public String getUserEmail() {
        return userEmail;
    }

    public void setAmountRemaining(double amountRemaining) {
        this.amountRemaining = amountRemaining;
    }

    public double getAmountRemaining() {
        return amountRemaining;
    }

}