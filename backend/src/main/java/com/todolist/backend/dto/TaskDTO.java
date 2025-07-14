package com.todolist.backend.dto;

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
}