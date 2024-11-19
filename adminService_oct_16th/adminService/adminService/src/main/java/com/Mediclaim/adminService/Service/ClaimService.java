package com.Mediclaim.adminService.Service;


import com.Mediclaim.adminService.model.Claim;
import com.Mediclaim.adminService.model.EnrolledUsers;
import com.Mediclaim.adminService.repo.ClaimRepository;
import com.Mediclaim.adminService.repo.EnrolledUsersRepo;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;
    @Autowired
    private EnrolledUsersRepo enrolledUsersRepo;


    @Autowired
    private JavaMailSender mailSender; // To send email notifications

    // Method to approve/reject claim and send email
    public Claim approveClaim(Long claimId, String remarks, boolean isApproved) {
        Optional<Claim> claimOpt = claimRepository.findById(claimId);

        if (claimOpt.isPresent()) {
            Claim claim = claimOpt.get();

            // Update claim status
            String status = isApproved ? "APPROVED" : "REJECTED";
            EnrolledUsers enrolleduser = getuser(claimId);
            if(status =="REJECTED"){
                enrolleduser.setAmountRemaining(enrolleduser.getAmountRemaining()+claim.getAmountClaimed());
            }
            claim.setStatus(status);
            claim.setAdminRemarks(remarks);

            // Save the claim to the database
            claimRepository.save(claim);

            // Send email notification to user
            sendEmailNotification(claim.getUserEmail(), status, remarks, claim.getAmountClaimed());

            return claim;
        }

        return null;

    }

    private EnrolledUsers getuser(long claimId) {
        Optional<Claim> claimOpt = claimRepository.findById(claimId);
        Claim claim = claimOpt.get();
        EnrolledUsers euser;
        euser = enrolledUsersRepo.findByUserEmailAndPolicyName(claim.getUserEmail(), claim.getPolicyName());
        return euser;
    }



    // Method to send email notification
    private void sendEmailNotification(String email, String status, String remarks, double amountToBeCredited) {
        String subject = "Your Claim has been " + status;
        String message = "Dear User, \n\n" +
                "Your claim has been " + status.toLowerCase() + ".\n" +
                "Remarks:\n" + remarks ;

        if ("APPROVED".equals(status)) {
            message += "Amount to be credited: " + amountToBeCredited + "\n";
        }

        message += "\n\n Thank you,\nTeam MediClaim";

        // Create email message
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        // Send the email
        mailSender.send(mailMessage);
    }

    public EnrolledUsers getenrolledUser(String userEmail) {
        return enrolledUsersRepo.findByuserEmail(userEmail);
    }

    public List<EnrolledUsers> getAllEnrolledUsers(String userEmail) {
        return enrolledUsersRepo.findAllByUserEmail(userEmail);
    }

    public List<EnrolledUsers> getValidEnrolledUsers(String userEmail) {
        List<EnrolledUsers> allUsers = enrolledUsersRepo.findAllByUserEmail(userEmail);
        return allUsers.stream()
                .filter(user -> user.getAmountRemaining() > 1000)
                .collect(Collectors.toList());
    }

    public boolean checkUserExists(String email, String policyName) {
        return enrolledUsersRepo.existsByUserEmailAndPolicyName(email, policyName);
    }

    public boolean checkUserValid(String email, String policyName) {
        // Assuming "Not Submitted" is the exact status text you want to check
        String status = "Not Submitted";
        return claimRepository.existsByUserEmailAndPolicyNameAndStatus(email, policyName, status);
    }
}
