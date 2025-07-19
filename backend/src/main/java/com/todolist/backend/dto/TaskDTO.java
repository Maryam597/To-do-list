package com.todolist.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private String username; 
    private LocalDateTime createdAt;  
    private LocalDate dueDate;        

}