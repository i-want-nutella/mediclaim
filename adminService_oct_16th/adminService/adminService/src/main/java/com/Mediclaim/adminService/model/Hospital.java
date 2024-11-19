package com.Mediclaim.adminService.model;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "hospitals")
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String hospitalName;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String adminEmail;

    @Column(nullable = false)
    private boolean cashless;

    public String getHospitalName() {
        return hospitalName;
    }

    public String getAdminEmail() {
        return adminEmail;
    }
}
