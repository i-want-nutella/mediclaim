package com.Mediclaim.UserService.controller;



import com.Mediclaim.UserService.Repo.NomineeRepo;
import com.Mediclaim.UserService.model.Nominee;
import com.Mediclaim.UserService.srvc.NomineeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/nominee")
public class NomineeController {

    @Autowired
    private NomineeService nomineeService;

    @Autowired
    private NomineeRepo nomineeRepository;

    @GetMapping("/findNominees/{userEmail}")
    public ResponseEntity<List<Nominee>> getNomineesByUserId(@PathVariable String userEmail) {
        List<Nominee> nominees = nomineeService.getNomineesByusermail(userEmail);
        if (nominees.isEmpty()) {
            return ResponseEntity.noContent().build();  // If no nominees found
        } else {
            return ResponseEntity.ok(nominees);  // Return list of nominees
        }
    }

    @PostMapping("/{userEmail}/add")
    public ResponseEntity<Nominee> addNominee(
            @PathVariable("userEmail") String userEmail,
            @RequestBody Nominee nominee) {

        try {
            Nominee savedNominee = nomineeService.addNominee(userEmail, nominee);
            return new ResponseEntity<>(savedNominee, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{userEmail}/remove/{nomineeId}")
    public ResponseEntity<Void> removeNominee(
            @PathVariable("userId") String userEmail,
            @PathVariable("nomineeId") Long nomineeId) {

        try {
            nomineeService.removeNominee(userEmail, nomineeId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
