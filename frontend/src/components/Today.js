import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Today({ tasks, onAdd, onComplete, onDelete }) {
  // අද දිනය YYYY-MM-DD ආකෘතියෙන් ගැනීම
  const todayDate = new Date().toISOString().split("T")[0];

  // අද දිනයට අදාළ Tasks පමණක් පෙරා ගැනීම (Filter)
  const todayTasks = tasks.filter((task) => task.dueDate === todayDate);

  return (
    <div>
      <h2>Today's Tasks ({todayDate})</h2>
      <TaskForm onAddTask={onAdd} defaultDate={todayDate} />
      <TaskList
        tasks={todayTasks}
        onComplete={onComplete}
        onDelete={onDelete}
      />
    </div>
  );
}

export default Today;
