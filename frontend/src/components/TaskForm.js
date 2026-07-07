import React, { useState, useEffect } from "react";

function TaskForm({ onAddTask, defaultDate }) {
  // State එක සකස් කිරීම
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: defaultDate || "", // පිටුවෙන් එන දිනය හෝ හිස් අගයක්
    status: "PENDING",
  });

  // පිටුවෙන් දිනය වෙනස් වෙද්දී Form එකේ දිනයත් අප්ඩේට් කිරීම
  useEffect(() => {
    setNewTask((prev) => ({ ...prev, dueDate: defaultDate || "" }));
  }, [defaultDate]);

  // Input වෙනස් වන විට state එක update කිරීම
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Form එක submit කිරීම
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(newTask); // App.js (හෝ parent component) එකට දත්ත යැවීම

    // Form එක නැවත හිස් කිරීම (දිනය defaultDate ලෙසම තබා ගනිමින්)
    setNewTask({
      title: "",
      description: "",
      dueDate: defaultDate || "",
      status: "PENDING",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexWrap: "wrap", // Screen එක කුඩා නම් පහළට වැටීමට
        gap: "10px",
        marginBottom: "30px",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        required
        value={newTask.title}
        onChange={handleInputChange}
        style={{
          flex: 1,
          minWidth: "150px",
          padding: "10px",
          fontSize: "16px",
        }}
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        required
        value={newTask.description}
        onChange={handleInputChange}
        style={{
          flex: 2,
          minWidth: "200px",
          padding: "10px",
          fontSize: "16px",
        }}
      />

      <input
        type="date"
        name="dueDate"
        value={newTask.dueDate}
        readOnly // දිනය වෙනස් කිරීමට අවශ්‍ය නැති නිසා
        style={{
          padding: "10px",
          fontSize: "16px",
          backgroundColor: "#eee",
          color: "#555",
          cursor: "not-allowed",
        }}
        title="Date is selected above"
      />

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
