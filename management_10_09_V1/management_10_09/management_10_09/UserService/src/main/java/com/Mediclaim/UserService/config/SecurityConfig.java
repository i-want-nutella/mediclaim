package com.Mediclaim.UserService.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import org.springframework.web.filter.GenericFilterBean;
import     org.springframework.web.filter.OncePerRequestFilter;
import    org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                .csrf().disable()
                .cors() // Enable CORS
                .and()
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("users/").permitAll()
                                .requestMatchers("/reg").permitAll()
                                .requestMatchers("/login").permitAll()
                                .requestMatchers("/verify").permitAll()
                                .requestMatchers("/user").permitAll()
                                //.requestMatchers(HttpMethod.POST, "/login").permitAll()
                                .requestMatchers("/nominee/**").permitAll()
                                .requestMatchers("password/forgot").permitAll()
                                .requestMatchers("password/reset").permitAll()
                                .requestMatchers("/unlock-account").permitAll()
                                .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login") // Your custom login page
                        .permitAll()
                )
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .build();

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
