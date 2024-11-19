package com.Mediclaim.adminService.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "policies")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String policyName;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double coverageAmount;


    public String getPolicyName() {
        return policyName;
    }

    public double getCoverageAmount() {
        return coverageAmount;
    }

}
