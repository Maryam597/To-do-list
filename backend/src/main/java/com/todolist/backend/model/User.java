package com.todolist.backend.model;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;



@Entity
@Table(name= "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String email; 
    
    private String password;

    private String role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Task> tasks;
    
}
