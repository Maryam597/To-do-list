package com.todolist.backend.controller;

import com.todolist.backend.dto.LoginRequest;
import com.todolist.backend.dto.RegisterRequest;
import com.todolist.backend.model.User;
import com.todolist.backend.security.JwtService;
import com.todolist.backend.service.UserService;

import java.util.Map;
import java.util.stream.Collectors;

import com.todolist.backend.model.Role;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
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
public ResponseEntity<?> createUser(@Valid @RequestBody RegisterRequest registerRequest, BindingResult result) {

    // 1. Gestion des erreurs de validation (champ vide, format incorrect, etc.)
    if (result.hasErrors()) {
        String errors = result.getAllErrors().stream()
            .map(error -> error.getDefaultMessage())
            .collect(Collectors.joining("; "));
        return ResponseEntity.badRequest().body(errors);
    }

    // 2. Vérifie unicité email
    if (userService.findByEmail(registerRequest.getEmail()).isPresent()) {
        return ResponseEntity.badRequest().body("Cet email est déjà utilisé.");
    }

    // 3. Vérifie unicité username
    if (userService.findByUsername(registerRequest.getUsername()) != null) {
        return ResponseEntity.badRequest().body("Ce nom d'utilisateur est déjà utilisé.");
    }

    // 4. Création utilisateur
    User user = new User();
    user.setUsername(registerRequest.getUsername());
    user.setEmail(registerRequest.getEmail());
    user.setPassword(registerRequest.getPassword());
    user.setRole(Role.USER);

    User savedUser = userService.saveUser(user);
    return ResponseEntity.status(201).body(savedUser);
}

    
}
