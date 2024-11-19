package com.Mediclaim.adminService.controller;



import com.Mediclaim.adminService.model.Claim;
import com.Mediclaim.adminService.Service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/claims")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    // Endpoint for approving/rejecting a claim
    @PostMapping("/{claimId}/approve")
    public ResponseEntity<Claim> approveClaim(
            @PathVariable Long claimId,
            @RequestParam String remarks,
            @RequestParam boolean isApproved) {

        Claim updatedClaim = claimService.approveClaim(claimId, remarks, isApproved);
        if (updatedClaim != null) {
            return ResponseEntity.ok(updatedClaim);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}
