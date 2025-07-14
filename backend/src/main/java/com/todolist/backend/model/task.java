package com.todolist.backend.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Entity
public class Task {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 


    @NotBlank(message =  "Le titre est obligatoire")
    @Size(min = 3, max = 100, message = "Le titre doit contenir entre 3 et 100 caractères")
    private String title;

    @Size(max = 500, message = "La description doit contenir 500 caractères")
    private String description;

    private boolean completed = false;


    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    public Task() {}

    public Long getId() { return id; }; 
    public void setId(Long id) {this.id = id;}

    public String getTitle() { return title; }
    public void setTitle(String title) {this.title = title;}

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed;}

    public User getUser() {return user;}
    public void setUser(User user) { this.user = user; }

    public String getDescription() {return description;}
    public void setDescription(String description) { this.description = description; }

}
