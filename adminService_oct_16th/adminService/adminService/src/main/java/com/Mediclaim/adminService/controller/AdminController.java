package com.Mediclaim.adminService.controller;



import com.Mediclaim.adminService.Service.ClaimService;
import com.Mediclaim.adminService.model.EnrolledUsers;
import com.Mediclaim.adminService.model.Policy;
import com.Mediclaim.adminService.model.Hospital;
import com.Mediclaim.adminService.model.Claim;
import com.Mediclaim.adminService.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private  ClaimService claimService;

    // Policy Endpoints
    @PostMapping("/policies/add")
    public ResponseEntity<Policy> addPolicy(@RequestBody Policy policy) {
        Policy createdPolicy = adminService.addPolicy(policy);
        return ResponseEntity.ok(createdPolicy);
    }

    @GetMapping("/policies")
    public ResponseEntity<List<Policy>> getAllPolicies() {
        return ResponseEntity.ok(adminService.getAllPolicies());
    }

    @PutMapping("/policies/update")
    public ResponseEntity<Policy> updatePolicy(@RequestBody Policy policy) {
        Policy updatedPolicy = adminService.updatePolicy(policy);
        return ResponseEntity.ok(updatedPolicy);
    }

    @DeleteMapping("/policies/{id}/delete")
    public ResponseEntity<Void> deletePolicy(@PathVariable Long id) {
        adminService.deletePolicy(id);
        return ResponseEntity.noContent().build();
    }

    // Hospital Endpoints
    @PostMapping("/hospitals/add")
    public ResponseEntity<Hospital> addHospital(@RequestBody Hospital hospital) {
        Hospital createdHospital = adminService.addHospital(hospital);
        return ResponseEntity.ok(createdHospital);
    }

    @GetMapping("/hospitals")
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        return ResponseEntity.ok(adminService.getAllHospitals());
    }

    @GetMapping("/hospital")
    public ResponseEntity<Hospital> findHospital(@RequestParam String email) {
        return ResponseEntity.ok(adminService.findHospital(email));
    }

    @PutMapping("/hospitals/update")
    public ResponseEntity<Hospital> updateHospital(@RequestBody Hospital hospital) {
        Hospital updatedHospital = adminService.updateHospital(hospital);
        return ResponseEntity.ok(updatedHospital);
    }

    @DeleteMapping("/hospitals/{id}/delete")
    public ResponseEntity<Void> deleteHospital(@PathVariable Long id) {
        adminService.deleteHospital(id);
        return ResponseEntity.noContent().build();
    }

    // Claim Approval Endpoints
    @GetMapping("/claims")
    public ResponseEntity<List<Claim>> getAllClaims() {
        return ResponseEntity.ok(adminService.getAllClaims());
    }

    @GetMapping("/check/{uemail}")
    public ResponseEntity<List<EnrolledUsers>> getAllEnrolledUsers(@PathVariable String uemail) {
        List<EnrolledUsers> eusers = claimService.getAllEnrolledUsers(uemail);
        return !eusers.isEmpty() ? ResponseEntity.ok(eusers) : ResponseEntity.notFound().build();
    }

    @GetMapping("/checkValid/{uemail}")
    public ResponseEntity<List<EnrolledUsers>> getValidEnrolledUsers(@PathVariable String uemail) {
        List<EnrolledUsers> eusers = claimService.getValidEnrolledUsers(uemail);
        return !eusers.isEmpty() ? ResponseEntity.ok(eusers) : ResponseEntity.notFound().build();
    }

    @GetMapping("/checkUser")
    public boolean checkUserExists(@RequestParam String email, @RequestParam String policyName) {
        return claimService.checkUserExists(email, policyName);
    }

    @GetMapping("/userValid")
    public boolean checkUserValid(@RequestParam String email, @RequestParam String policyName) {
        return claimService.checkUserValid(email, policyName);
    }
}
