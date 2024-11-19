package com.Mediclaim.adminService.repo;

import com.Mediclaim.adminService.model.EnrolledUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrolledUsersRepo extends JpaRepository<EnrolledUsers,Long> {
    EnrolledUsers findByuserEmail(String userEmail);
    EnrolledUsers findByUserEmailAndPolicyName(String userEmail, String policyName);
    List<EnrolledUsers> findAllByUserEmail(String userEmail);
    boolean existsByUserEmailAndPolicyName(String userEmail, String policyName);
}

