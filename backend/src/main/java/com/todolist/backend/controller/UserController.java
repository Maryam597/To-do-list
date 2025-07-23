package com.todolist.backend.controller;

import com.todolist.backend.dto.LoginRequest;
import com.todolist.backend.dto.RegisterRequest;
import com.todolist.backend.model.User;
import com.todolist.backend.security.JwtService;
import com.todolist.backend.service.UserService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.todolist.backend.model.Role;
import jakarta.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

@PostMapping("/register")
public ResponseEntity<?> createUser(@Valid @RequestBody RegisterRequest request) {
    // Vérifie uniquement les doublons (le reste est géré automatiquement)
    Map<String, List<String>> errors = new HashMap<>();

    if (userService.findByEmail(request.getEmail()).isPresent()) {
        errors.computeIfAbsent("email", key -> new ArrayList<>()).add("Cet email est déjà utilisé.");
    }

    if (userService.findByUsername(request.getUsername()) != null) {
        errors.computeIfAbsent("username", key -> new ArrayList<>()).add("Ce nom d'utilisateur est déjà utilisé.");
    }

    if (!errors.isEmpty()) {
        return ResponseEntity.badRequest().body(errors);
    }

    User user = new User();
    user.setUsername(request.getUsername());
    user.setEmail(request.getEmail());
    user.setPassword(request.getPassword());
    user.setRole(Role.USER);
    return ResponseEntity.status(201).body(userService.saveUser(user));
}


}
