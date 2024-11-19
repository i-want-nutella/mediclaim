package com.Mediclaim.adminService.repo;


import com.Mediclaim.adminService.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {
    Hospital findByAdminEmail(String adminEmail);
}
