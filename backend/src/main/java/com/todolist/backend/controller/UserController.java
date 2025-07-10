package com.todolist.backend.controller;

import com.todolist.backend.model.User;
import com.todolist.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserService userService;


    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()).isPresent()) {

            return ResponseEntity.badRequest().body("cet email est déjà utilisé.");
        }

         if (userService.findByUsername(user.getUsername()).isPresent()) {

            return ResponseEntity.badRequest().body("ce nom d'utilisateur est déjà utilisé.");
        }




        User savedUser = userService.saveUser(user);
        return ResponseEntity.status(201).body(savedUser);
    }

    }
    
    

