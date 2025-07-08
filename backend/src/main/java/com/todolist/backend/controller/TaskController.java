package com.todolist.backend.controller;
import com.todolist.backend.model.Task;
import com.todolist.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:4200")


public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List <Task> getAllTasks(){
        return taskRepository.findAll();
    }
    
    @PostMapping("path")
    public Task createTask(@RequestBody Task task) {        
        return taskRepository.save(task);
    }
    
}
