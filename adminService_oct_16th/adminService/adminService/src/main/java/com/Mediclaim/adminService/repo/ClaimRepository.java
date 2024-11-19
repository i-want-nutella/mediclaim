package com.Mediclaim.adminService.repo;


import com.Mediclaim.adminService.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClaimRepository extends JpaRepository<Claim, Long> {

    boolean existsByUserEmailAndPolicyNameAndStatus(String email, String policyName, String status);

}
