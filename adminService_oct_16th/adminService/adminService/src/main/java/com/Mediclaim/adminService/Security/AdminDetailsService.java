package com.Mediclaim.adminService.Security;

import com.Mediclaim.adminService.model.Admin;
import com.Mediclaim.adminService.repo.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class AdminDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByUsername(username);
        if (admin == null) {
            throw new UsernameNotFoundException("Admin not found");
        }

        // Create a list of authorities/roles for this admin
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(admin.getRole()));

        // Return a Spring Security User object
        return new org.springframework.security.core.userdetails.User(admin.getUsername(), admin.getPassword(), authorities);
    }
}
