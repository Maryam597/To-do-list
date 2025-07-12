package com.todolist.backend.controller;

import com.todolist.backend.dto.LoginRequest;
import com.todolist.backend.dto.RegisterRequest;
import com.todolist.backend.model.User;
import com.todolist.backend.security.JwtService;
import com.todolist.backend.service.UserService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired 
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest registerRequest) {
        if (userService.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Cet email est déjà utilisé.");
        }

        if (userService.findByUsername(registerRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Ce nom d'utilisateur est déjà utilisé.");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(registerRequest.getPassword());
        user.setRole(registerRequest.getRole());

        // Rôle par défaut
        if (user.getRole() == null) {
            user.setRole("USER");
        }

        User savedUser = userService.saveUser(user);
        return ResponseEntity.status(201).body(savedUser);
    }

    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    //     try {
    //        authenticationManager.authenticate(
    //             new UsernamePasswordAuthenticationToken(
    //                 loginRequest.getEmail(),
    //                 loginRequest.getPassword()
    //             )
    //         );

    //     User user = userService.findByEmail(loginRequest.getEmail()).orElseThrow();
    //     String token = jwtService.generateToken(user.getEmail());

    //     return ResponseEntity.ok().body(Map.of(
    //         "token", token,
    //         "username", user.getUsername(),
    //         "email", user.getEmail(),
    //         "role", user.getRole()
    //     ));

    //     } catch (AuthenticationException ex) {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe invalide");
    //     }
    // }
}
