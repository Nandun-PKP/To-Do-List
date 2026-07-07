import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Components
import Today from "./components/Today";
import Upcoming from "./components/Upcoming";

// API Services
import { getTasks, createTask, updateTask, deleteTask } from "./services/api";

// Styles
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  // Backend එකෙන් දත්ත ලබා ගැනීම (Fetch Tasks)
  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // අලුත් Task එකක් එකතු කිරීම
  const handleAddTask = async (newTask) => {
    try {
      await createTask(newTask);
      fetchTasks(); // අලුත් දත්තය එකතු කළ පසු ලැයිස්තුව යාවත්කාලීන කිරීම
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Task එකක් මකා දැමීම
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Task එකක් 'COMPLETED' ලෙස වෙනස් කිරීම
  const handleCompleteTask = async (task) => {
    const updatedTask = { ...task, status: "COMPLETED" };
    try {
      await updateTask(updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Router>
      <div
        style={{
          maxWidth: "800px", // UI එක විශාල වීම වැළැක්වීමට 800px ලෙස යොදා ඇත
          margin: "0 auto",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1
          style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}
        >
          My To-Do List
        </h1>

        {/* Navigation Buttons (App.css හි ඇති styles මෙයට බලපායි) */}
        <nav className="nav-bar">
          <Link to="/" className="nav-btn">
            Today
          </Link>
          <Link to="/upcoming" className="nav-btn">
            Upcoming
          </Link>
        </nav>

        {/* Routes / Pages */}
        <Routes>
          <Route
            path="/"
            element={
              <Today
                tasks={tasks}
                onAdd={handleAddTask}
                onComplete={handleCompleteTask}
                onDelete={handleDeleteTask}
              />
            }
          />
          <Route
            path="/upcoming"
            element={
              <Upcoming
                tasks={tasks}
                onAdd={handleAddTask}
                onComplete={handleCompleteTask}
                onDelete={handleDeleteTask}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
