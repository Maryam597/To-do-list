package com.todolist.backend.repository;

import com.todolist.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;
 

public interface UserRepository extends JpaRepository<User, Long>{


    
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);;

}