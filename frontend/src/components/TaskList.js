import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onComplete, onDelete }) {
  // Task එකක්වත් නොමැති විට පෙන්වන පණිවිඩය
  if (tasks.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
        No tasks found for this date. Add a new one!
      </p>
    );
  }

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th> {/* පෙර පියවරට ගැළපෙන පරිදි අලුතින් එකතු කරන ලදි */}
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            index={index}
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
