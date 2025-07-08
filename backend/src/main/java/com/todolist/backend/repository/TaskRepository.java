package com.todolist.backend.repository;

import com.todolist.backend.model.task;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TaskRepository extends JpaRepository<task, Long> {

    
    
}
