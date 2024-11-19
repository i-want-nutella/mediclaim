package com.mediclaim.claim.controller;

import com.mediclaim.claim.model.Claim;
import com.mediclaim.claim.model.EnrolledUsers;
import com.mediclaim.claim.srvc.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/enrollement")
public class enroll {

    @Autowired
    private ClaimService claimService;

    @PostMapping("/reg")
    public ResponseEntity<EnrolledUsers> enrolluser(@RequestBody EnrolledUsers enuser) {

        return ResponseEntity.ok(claimService.enrolluser(enuser));
    }
}