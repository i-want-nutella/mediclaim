package com.mediclaim.claim.repo;


import com.mediclaim.claim.model.Policy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyRepository extends JpaRepository<Policy, Long> {

    Policy findBypolicyName(String policyname);
}

