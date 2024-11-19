package com.Mediclaim.UserService.Repo;

import com.Mediclaim.UserService.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource
public interface UserRepo extends JpaRepository<User, Long> {

    User findByEmail(String email);
    User findByMobileNum(String num);

    User findByVerificationToken(String token);
}
