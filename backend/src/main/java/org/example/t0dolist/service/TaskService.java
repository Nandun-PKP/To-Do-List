package org.example.t0dolist.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.t0dolist.dto.TaskDTO;
import org.example.t0dolist.mapper.TaskMapper;
import org.example.t0dolist.model.Task;
import org.example.t0dolist.repo.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private  final TaskMapper taskMapper;

    public List<TaskDTO> getAllTasks(){
        List<Task>taskList = taskRepository.findAll();
        return taskMapper.toDoList(taskList);
    }
    public TaskDTO saveTask(TaskDTO taskDTO){
        Task task = taskMapper.toEntity(taskDTO);
        taskRepository.save(task);
        return taskDTO;
    }
    public TaskDTO getTask(Long id){
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found with ID: " + id));;
        return taskMapper.toDto(task);
    }
    public TaskDTO updateTask(TaskDTO taskDTO){
        Task task = taskMapper.toEntity(taskDTO);
        taskRepository.save(task);
        return taskDTO;
    }
    public String deleteTask(Long id){
        taskRepository.deleteById(id);
        return "task delete successfully";
    }
}
