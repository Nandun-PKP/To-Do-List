package org.example.t0dolist.mapper;

import org.example.t0dolist.dto.TaskDTO;
import org.example.t0dolist.model.Task;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TaskMapper {

    TaskDTO toDto(Task task);

    Task toEntity(TaskDTO taskDTO);

    List<TaskDTO> toDoList(List<Task> tasks);

}
