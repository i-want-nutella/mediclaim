package com.mediclaim.claim.repo;

import com.mediclaim.claim.model.Claim;
import com.mediclaim.claim.model.EnrolledUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrolledUsersRepo extends JpaRepository<EnrolledUsers,Long> {
    EnrolledUsers findByuserEmail(String userEmail);
    EnrolledUsers findBypolicyName(String policyName);

    EnrolledUsers findByUserEmailAndPolicyName(String userEmail, String policyName);

    List<EnrolledUsers> findByUserEmail(String userEmail);
}

