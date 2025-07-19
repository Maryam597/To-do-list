package com.todolist.backend.controller;

import com.todolist.backend.dto.TaskDTO;
import com.todolist.backend.model.Task;
import com.todolist.backend.model.User;
import com.todolist.backend.repository.TaskRepository;
import com.todolist.backend.repository.UserRepository;
import com.todolist.backend.service.TaskService;

import jakarta.validation.Valid;

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

    // Récupère toutes les tâches liées à l'utilisateur connecté
    @GetMapping
    public ResponseEntity<List<TaskDTO>> getTasksByUser(Principal principal) {
        String userEmail = principal.getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        List<Task> tasks = taskService.findByUserId(user.getId());

        List<TaskDTO> taskDTOs = tasks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(taskDTOs);
    }

@PostMapping
public ResponseEntity<TaskDTO> createTask(@Valid @RequestBody TaskDTO taskDto, Principal principal) {
    if (taskDto.getTitle() == null || taskDto.getTitle().trim().isEmpty()) {
        return ResponseEntity.badRequest().body(null);
    }

    String userEmail = principal.getName();
    User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

    // Création de l'entité Task
    Task task = new Task();
    task.setTitle(taskDto.getTitle());
    task.setDescription(taskDto.getDescription() != null ? taskDto.getDescription() : "");
    task.setCompleted(taskDto.isCompleted());
    task.setUser(user);

    if (taskDto.getDueDate() != null) {
        task.setDueDate(taskDto.getDueDate());  // ici le champ est bien transféré
    }

    Task savedTask = taskService.save(task);
    return ResponseEntity.ok(convertToDTO(savedTask));
}


    // Supprime une tâche par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Met à jour une tâche existante
    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @Valid @RequestBody Task task) {
        task.setId(id);
        Task updatedTask = taskService.update(task);
        return ResponseEntity.ok(convertToDTO(updatedTask));
    }

    // Convertit une entité Task en DTO
    private TaskDTO convertToDTO(Task task) {
        return new TaskDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted(),
                task.getUser() != null ? task.getUser().getUsername() : null,
                task.getCreatedAt(),
                task.getDueDate()
        );
    }
}
