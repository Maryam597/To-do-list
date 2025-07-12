package com.todolist.backend.controller;

import com.todolist.backend.dto.RegisterRequest;
import com.todolist.backend.model.User;
import com.todolist.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;

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

        // 👉 Le rôle par défaut peut être mis ici si tu veux :
        if (user.getRole() == null) {
            user.setRole("USER");
        }

        User savedUser = userService.saveUser(user);
        return ResponseEntity.status(201).body(savedUser);
    }
}
