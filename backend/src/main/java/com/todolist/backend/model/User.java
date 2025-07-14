package com.todolist.backend.model;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;



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

    @Enumerated(EnumType.STRING)
    private Role role;

        public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }


@OneToMany(mappedBy = "user")
@JsonManagedReference
    private List<Task> tasks;
    
}
