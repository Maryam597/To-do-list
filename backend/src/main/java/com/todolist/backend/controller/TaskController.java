package com.todolist.backend.controller;

import com.todolist.backend.model.Task;
import com.todolist.backend.model.User;
import com.todolist.backend.service.TaskService;
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

    // Récupère toutes les tâches (à filtrer par utilisateur plus tard si nécessaire)
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.findAll();
    }

    // Crée une nouvelle tâche et l’associe à l’utilisateur connecté
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task, Principal principal) {
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
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        task.setId(id);
        return taskService.update(task);
    }
}
