package com.todolist.backend.controller;


import com.todolist.backend.model.User;
import com.todolist.backend.security.JwtService;
import com.todolist.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.*;

import java.lang.module.ResolutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            User user = userService.findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable"));
            
            String token = jwtService.generateToken(authentication);

            return ResponseEntity.ok(new LoginResponse(token, user.getUsername(), user.getEmail(), user.getRole()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Identifiants invalides");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me (HttpServletRequest request) {
        String token = jwtService.extractTokenFromRequest(request);
        String username = jwtService.extractUsername(token);
        return ResponseEntity.ok("Connecté en tant que " + username);
    }
    
    @Data
    public static class LoginRequest {
        private String email; 
        private String password;
    
    }

    @Data
    @AllArgsConstructor
    public static class LoginResponse {
        private String token ;
        private String username;
        private String email;
        private String role;
    }
    
    }
    

