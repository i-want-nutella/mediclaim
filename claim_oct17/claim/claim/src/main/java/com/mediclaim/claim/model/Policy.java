package com.mediclaim.claim.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Entity
@Table(name = "policies")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="policy_name", nullable = false)
    private String policyName;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double coverageAmount;

}