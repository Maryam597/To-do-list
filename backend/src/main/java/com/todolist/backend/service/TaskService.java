package com.todolist.backend.service;

import com.todolist.backend.model.Task;
import com.todolist.backend.repository.TaskRepository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        if(task.getId() == null) {
            throw new RuntimeException("Id de la tâche nécessaire pour modifier ");
        }

        Optional<Task> existing = taskRepository.findById(task.getId());
        if(!existing.isPresent()) {
            throw new RuntimeException("Tâche non trouvée avec l'id" + task.getId());
        }

        return taskRepository.save(task);
    }
}
