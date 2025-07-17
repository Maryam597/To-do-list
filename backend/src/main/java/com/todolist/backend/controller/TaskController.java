package com.todolist.backend.controller;

import com.todolist.backend.dto.TaskDTO;
import com.todolist.backend.model.Task;
import com.todolist.backend.model.User;
import com.todolist.backend.service.TaskService;

import jakarta.validation.Valid;

import com.todolist.backend.repository.TaskRepository;
import com.todolist.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    @Autowired
    private TaskService taskService;
    
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    // @GetMapping("/tasks")
    // public List<TaskDTO> getAllTasks() {
    //     List<Task> tasks = taskRepository.findAll();
    //     return tasks.stream()
    //         .map(this::convertToDTO)
    //         .collect(Collectors.toList());
    // }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getTasksByUser(Principal principal) {
        String userEmail = principal.getName();
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        List<Task> task = taskService.findByUserId(user.getId());

        return ResponseEntity.ok(
            task.stream().map(this::convertToDTO).collect(Collectors.toList())
        );
    }

    @PostMapping
public ResponseEntity<TaskDTO> createTask(@RequestBody Task task, Principal principal) {
    if (task.getTitle() == null || task.getTitle().trim().isEmpty()) {
        return ResponseEntity.badRequest().build();
    }

    String userEmail = principal.getName();
    User user = userRepository.findByEmail(userEmail)
        .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

    task.setUser(user);

    Task savedTask = taskService.save(task);
    return ResponseEntity.ok(convertToDTO(savedTask));
}



    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @Valid @RequestBody Task task) {
        task.setId(id);
        Task updated = taskService.update(task);
        return ResponseEntity.ok(convertToDTO(updated));
    }

    // Méthode utilitaire pour convertir une entité vers un DTO
    private TaskDTO convertToDTO(Task task) {
        return new TaskDTO(
            task.getId(),
            task.getTitle(),
            task.getDescription(),
            task.isCompleted(),
            task.getUser() != null ? task.getUser().getUsername() : null
        );
    }
}
