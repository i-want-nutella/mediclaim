package com.mediclaim.claim.repo;

import com.mediclaim.claim.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClaimRepo extends JpaRepository<Claim, Long> {
    // Custom query methods can be added here
    List<Claim> findByStatus(String status);  // Example: find claims by status
    List<Claim> findByUserEmail(String userEmail);
    Optional<Claim> findByuserEmail(String userEmail);

    List<Claim> findByAccEmail(String accEmail);

    Claim findByAccEmailAndPolicyNameAndStatus(String accEmail, String policyName, String status);
}
