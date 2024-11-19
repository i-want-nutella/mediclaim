package com.Mediclaim.adminService.repo;



import com.Mediclaim.adminService.model.Policy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
}

