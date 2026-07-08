package org.example.t0dolist.contoller;

import lombok.RequiredArgsConstructor;
import org.example.t0dolist.dto.TaskDTO;
import org.example.t0dolist.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api")
public class TaskContoller {
    private final TaskService taskService;

    @PostMapping("/createtask")
    public TaskDTO createTask(@RequestBody TaskDTO taskDTO){
        return taskService.saveTask(taskDTO);
    }

    @GetMapping("/gettasks")
    public List<TaskDTO> getTasks(){
        return taskService.getAllTasks();
    }

    @GetMapping("/gettask/{id}")
    public TaskDTO getTasks(@PathVariable Long id){
        return taskService.getTask(id);
    }

    @PutMapping("/updatetask")
    public TaskDTO updateUser(@RequestBody TaskDTO taskDTO){
        return  taskService.updateTask(taskDTO);
    }

    @DeleteMapping("/{id}")
    public  String deleteTask(@PathVariable Long id){
        return taskService.deleteTask(id);
    }
}
