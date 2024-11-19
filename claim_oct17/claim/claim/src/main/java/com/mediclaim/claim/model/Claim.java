package com.mediclaim.claim.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


@Data
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

    @Column(name = "policy_name", nullable = false)
    private String policyName;

    @Column(nullable = true)
    private String status; // PENDING, APPROVED, REJECTED

    @Column(nullable = true)
    private LocalDateTime claimDate;

    @Column(nullable = true)
    private String adminRemarks;



}
