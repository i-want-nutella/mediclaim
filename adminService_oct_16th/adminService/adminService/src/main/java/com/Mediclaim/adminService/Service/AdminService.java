package com.Mediclaim.adminService.Service;



import com.Mediclaim.adminService.model.Policy;
import com.Mediclaim.adminService.model.Hospital;
import com.Mediclaim.adminService.model.Claim;
import com.Mediclaim.adminService.repo.PolicyRepository;
import com.Mediclaim.adminService.repo.HospitalRepository;
import com.Mediclaim.adminService.repo.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private PolicyRepository policyRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    @Autowired
    private ClaimRepository claimRepository;

    // Policy methods
    public Policy addPolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public Policy updatePolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    public void deletePolicy(Long id) {
        policyRepository.deleteById(id);
    }

    // Hospital methods
    public Hospital addHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    public Hospital updateHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    public Hospital findHospital(String email){ return hospitalRepository.findByAdminEmail(email);}

    public void deleteHospital(Long id) {
        hospitalRepository.deleteById(id);
    }

    // Claim methods
    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }


    }

