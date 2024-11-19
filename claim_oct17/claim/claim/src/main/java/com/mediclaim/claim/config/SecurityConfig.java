package com.Mediclaim.claim.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf().disable() // Disable CSRF for simplicity, be cautious with this in production
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/claim/**").permitAll()
                                .requestMatchers("/enrollement/**").permitAll()

                                .anyRequest().authenticated()
                );// Ensure your endpoints are secured

        return http.build();
    }


    // CORS configuration
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000"); // Allow your React app
        config.addAllowedHeader("*"); // Allow all headers
        config.addAllowedMethod(HttpMethod.GET); // Allow GET method
        config.addAllowedMethod(HttpMethod.POST); // Allow POST method
        config.addAllowedMethod(HttpMethod.PUT); // Allow PUT method
        config.addAllowedMethod(HttpMethod.DELETE); // Allow DELETE method
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
