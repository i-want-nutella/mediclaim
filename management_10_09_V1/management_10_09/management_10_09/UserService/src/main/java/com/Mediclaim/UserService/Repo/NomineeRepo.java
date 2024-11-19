package com.Mediclaim.UserService.Repo;
import com.Mediclaim.UserService.model.Nominee;
import com.Mediclaim.UserService.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;


public interface NomineeRepo extends JpaRepository<Nominee, Long> {


    List<Nominee> findByuserEmail(String userEmail);
}
