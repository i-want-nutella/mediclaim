package com.Mediclaim.UserService.srvc;

import com.Mediclaim.UserService.Repo.NomineeRepo;
import com.Mediclaim.UserService.Repo.UserRepo;
import com.Mediclaim.UserService.model.Nominee;
import com.Mediclaim.UserService.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NomineeService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private NomineeRepo nomineeRepository;

    public List<Nominee> getNomineesByusermail(String userEmail) {
        return nomineeRepository.findByuserEmail(userEmail);
    }





    public Nominee addNominee(String userEmail, Nominee nominee) {
        // Find user by ID
        //User user = userRepository.findByEmail(userEmail);


        // Set the user for the nominee
        nominee.setUserEmail(userEmail);

        // Save the nominee
        return nomineeRepository.save(nominee);
    }

    public void removeNominee(String userEmail, Long nomineeId) {
        // Find user by ID
        User user = userRepository.findByEmail(userEmail);


        // Find nominee by ID
        Nominee nominee = nomineeRepository.findById(nomineeId)
                .orElseThrow(() -> new RuntimeException("Nominee not found"));

        // Ensure nominee belongs to the user
        if (!nominee.getUserEmail().equals(user.getEmail())) {
            throw new RuntimeException("Nominee does not belong to the specified user");
        }

        // Remove nominee
        nomineeRepository.delete(nominee);
    }
}


