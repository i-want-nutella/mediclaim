package com.mediclaim.claim.controller;

import com.mediclaim.claim.model.Claim;
import com.mediclaim.claim.srvc.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/claim")
public class ClaimController {

    @Autowired
    private ClaimService claimService;


    @PostMapping("/submit")
    public ResponseEntity<Claim> submitClaim(@RequestBody Claim claim) {
        return ResponseEntity.ok(claimService.submitClaim(claim));
    }

    @PostMapping("/update")
    public ResponseEntity<Claim> updateClaim(@RequestParam String userEmail,@RequestParam String policyName, @RequestParam double amountClaimed) {
        return ResponseEntity.ok(claimService.updateClaim(userEmail, policyName, amountClaimed));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Claim> getClaimById(@PathVariable Long id) {
        Claim claim = claimService.getClaimById(id);
        return claim != null ? ResponseEntity.ok(claim) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Claim>> getAllClaims() {
        return ResponseEntity.ok(claimService.getAllClaims());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateClaimStatus(@PathVariable Long id, @RequestParam String status) {
        claimService.updateClaimStatus(id, status);
        return ResponseEntity.ok().build();
    }

//    @GetMapping("/user/{email}")
//    public ResponseEntity<List<Claim>> getClaimsByUserEmail(@PathVariable String email) {
//        List<Claim> claims = claimService.getClaimsByUserEmail(email);
//        if (claims.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No records found"); // Return 204 if no claims found
//        }
//        return ResponseEntity.ok(claims); // Return 200 with claims
//    }

    @GetMapping("/user/{email}")
    public ResponseEntity<Object> getClaimsByUserEmail(@PathVariable String email) {
        List<Claim> claims = claimService.getClaimsByUserEmail(email);
        if (claims.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No records found"); // Return 404 with custom message
        }
        return ResponseEntity.ok(claims); // Return 200 with claims
    }

    @GetMapping("/tp/{email}")
    public ResponseEntity<Object> getClaimsByAccEmail(@PathVariable String email) {
        List<Claim> claims = claimService.getClaimsByAccEmail(email);
        if (claims.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No records found"); // Return 404 with custom message
        }
        return ResponseEntity.ok(claims); // Return 200 with claims
    }
}
