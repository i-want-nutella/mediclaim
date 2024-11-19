package com.Mediclaim.adminService.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "claims")
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userEmail; // Link to user making the claim

    @Column(nullable = false)
    private String accEmail;

    @Column(nullable = false)
    private double amountClaimed;

    @Column(nullable = false)
    private String policyName;

    @Column(nullable = true)
    private String status; // PENDING, APPROVED, REJECTED

    @Column(nullable = true)
    private LocalDateTime claimDate;

    @Column(nullable = true)
    private String adminRemarks;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAdminRemarks() {
        return adminRemarks;
    }

    public void setAdminRemarks(String adminRemarks) {
        this.adminRemarks = adminRemarks;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getPolicyName() {
        return policyName;
    }

    public double getAmountClaimed() {
        return amountClaimed;
    }
}
