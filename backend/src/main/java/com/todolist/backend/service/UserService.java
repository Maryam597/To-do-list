package com.todolist.backend.service;

import com.todolist.backend.model.User;
import com.todolist.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }


    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public String encodePassword(String rawPassword) {
    return passwordEncoder.encode(rawPassword);
}

}
