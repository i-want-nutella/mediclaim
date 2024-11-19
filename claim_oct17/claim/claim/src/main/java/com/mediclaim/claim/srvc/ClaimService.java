package com.mediclaim.claim.srvc;

import com.mediclaim.claim.model.Claim;
import com.mediclaim.claim.model.EnrolledUsers;
import com.mediclaim.claim.model.Policy;
import com.mediclaim.claim.repo.ClaimRepo;
import com.mediclaim.claim.repo.EnrolledUsersRepo;
import com.mediclaim.claim.repo.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClaimService {

    @Autowired
    private EnrolledUsersRepo enrolledUsersRepo;
    @Autowired
    private  PolicyRepository policyRepository;
    @Autowired
    private ClaimRepo claimRepo;


    public Claim submitClaim(Claim claim) {
        // Set the current date to the claim's date field
        if ("Not Submitted".equals(claim.getStatus())){
            return claimRepo.save(claim);
        }

        claim.setClaimDate(LocalDateTime.now());

        // Retrieve the enrolled user based on email and policy name
        EnrolledUsers enrolledUser = enrolledUsersRepo.findByUserEmailAndPolicyName(claim.getAccEmail(), claim.getPolicyName());

        if (enrolledUser.getAmountRemaining() >= claim.getAmountClaimed()){
            // Calculate the pending amount by subtracting the amount claimed from the user's remaining amount
            double amntpending = enrolledUser.getAmountRemaining() - claim.getAmountClaimed();

            // Update the user's remaining amount
            enrolledUser.setAmountRemaining(amntpending);
            enrolledUsersRepo.save(enrolledUser);
            claim.setStatus("Pending");
            claim.setAdminRemarks("Waiting For Response from Admin");

            // Save the claim to the repository
            return claimRepo.save(claim);
        }
        else{
            claim.setStatus("REJECTED");
            claim.setAdminRemarks("We have reviewed your recent policy claim application. Unfortunately, we regret to inform you that your claim has been rejected." +
                    "\nThe primary reason for this decision is that the coverage amount of your current policy is less than the amount you have applied for. According to our policy terms and conditions, claims cannot exceed the maximum coverage limit specified in your insurance plan." +
                    "\nThank you for your understanding and cooperation.");

            return claimRepo.save(claim);
        }
    }

    private EnrolledUsers getuser(String usermail) {
        Optional<Claim> claimOpt = claimRepo.findByuserEmail(usermail);
        Claim claim2 = claimOpt.get();
        EnrolledUsers euser;
        euser = enrolledUsersRepo.findByuserEmail(claim2.getUserEmail());
        return euser;
    }

    public EnrolledUsers enrolluser(EnrolledUsers enuser){
        List<EnrolledUsers> eusers = enrolledUsersRepo.findByUserEmail(enuser.getUserEmail());
        for (EnrolledUsers euser : eusers) {
            if (euser.getPolicyName().equals(enuser.getPolicyName())) {
                // If a user with the same email and policy is found, return the existing user
                return euser;}
        }

        Policy enrolledpolicy = getpolicy(enuser.getPolicyName());
        enuser.setAmountRemaining(enrolledpolicy.getCoverageAmount());
        return enrolledUsersRepo.save(enuser);
    }

    public Policy getpolicy(String pname) {

        Policy p;
        p = policyRepository.findBypolicyName(pname);
        return p;
    }

    public List<Claim> getAllClaims() {
        return claimRepo.findAll();
    }

    public Claim getClaimById(Long id) {
        return claimRepo.findById(id).orElse(null);
    }

    public void updateClaimStatus(Long id, String status) {
        Claim claim = getClaimById(id);
        if (claim != null) {
            claim.setStatus(status);
            claimRepo.save(claim);
        }
    }

    public List<Claim> getClaimsByUserEmail(String userEmail) {
        return claimRepo.findByAccEmail(userEmail);
    }

    public List<Claim> getClaimsByAccEmail(String userEmail) {
        return claimRepo.findByUserEmail(userEmail);
    }

    public Claim updateClaim(String accEmail, String policyName, double newAmountClaimed) {
        Claim claim = claimRepo.findByAccEmailAndPolicyNameAndStatus(accEmail, policyName, "Not Submitted");

//            Claim claim = claimOpt.get();

            claim.setClaimDate(LocalDateTime.now());
            claim.setAmountClaimed(newAmountClaimed);
            claim.setStatus("Pending");

            // Optionally, update admin remarks or other fields if needed
            claim.setAdminRemarks("Waiting for response from Admin");

            // Save the updated claim back to the repository
            return claimRepo.save(claim);
    }

}
