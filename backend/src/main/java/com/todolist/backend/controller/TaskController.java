package com.todolist.backend.controller;

import com.todolist.backend.model.Task;
import com.todolist.backend.model.User;
import com.todolist.backend.service.TaskService;

import jakarta.validation.Valid;

import com.todolist.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
        public ResponseEntity<List<Task>> getTasksByUser(Principal principal) {
        String userEmail = principal.getName(); // Email extrait du JWT via Spring Security

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        List<Task> tasks = taskService.findByUserId(user.getId());

        return ResponseEntity.ok(tasks);

    }

    // Crée une nouvelle tâche et l’associe à l’utilisateur connecté
    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task, Principal principal) {
        String userEmail = principal.getName(); // Email extrait du JWT via Spring Security

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        System.out.println("Tâche reçue : " + task);

        task.setUser(user); // Association tâche/utilisateur
        Task savedTask = taskService.save(task);

        return ResponseEntity.ok(savedTask);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.delete(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @Valid @RequestBody Task task) {
        task.setId(id);
        return taskService.update(task);
    }
}
