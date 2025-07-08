package com.todolist.backend.model;
import jakarta.persistence.*;

@Entity
public class task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
}
