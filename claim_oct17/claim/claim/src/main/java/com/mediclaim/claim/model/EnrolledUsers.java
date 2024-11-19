package com.mediclaim.claim.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Data
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

    // Constructors


//    public EnrolledUsers(String userEmail, String policyNumber, double amountRemaining) {
//        this.userEmail = userEmail;
//        this.policyName = policyNumber;
//        this.amountRemaining = amountRemaining;
//    }

}
