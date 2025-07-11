package com.todolist.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Profile("test")  // active cette config uniquement quand le profil 'test' est actif
@Configuration
public class TestSecurityConfig {


    @Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Désactive toute sécurité pour les tests
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }
}
