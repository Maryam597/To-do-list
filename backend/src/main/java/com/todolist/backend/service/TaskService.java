package com.todolist.backend.service;

import com.todolist.backend.model.Task;
import com.todolist.backend.repository.TaskRepository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
private EntityManager entityManager; 

    // public List<Task> findAll() {
    //     return taskRepository.findAll();
    // }

    public List<Task> findByUserId(Long userId) {
        return taskRepository.findByUserId(userId);
    }


public Task save(Task task) {
        if (task.getDueDate() != null && task.getDueDate().isBefore(LocalDate.now())) {
        throw new IllegalArgumentException("La date butoir ne peut pas être dans le passé");
    }
    Task savedTask = taskRepository.save(task);
    taskRepository.flush(); // Force l'écriture immédiate
    System.out.println("Tâche insérée avec ID : " + savedTask.getId());
    return savedTask;
}




    public void delete(Long id) {
        if(!taskRepository.existsById(id)) {
            throw new RuntimeException("Tâche non trouvée avec " + id);
        }
        taskRepository.deleteById(id);
    }

    public Task update(Task task) {
    if (task.getId() == null) {
        throw new RuntimeException("Id de la tâche nécessaire pour modifier");
    }

    Task existing = taskRepository.findById(task.getId())
        .orElseThrow(() -> new RuntimeException("Tâche non trouvée avec l'id " + task.getId()));

    if (task.getDueDate() != null && task.getDueDate().isBefore(LocalDate.now())) {
        throw new IllegalArgumentException("La date butoir ne peut pas être dans le passé");
    }

    // On conserve la date de création originale
    task.setCreatedAt(existing.getCreatedAt());
    return taskRepository.save(task);
}

}