import React from "react";

function TaskItem({ task, index, onComplete, onDelete }) {
  return (
    // Task එක complete නම් .completed-row CSS class එක යෙදේ (කොළ පැහැති පසුබිමක් සඳහා)
    <tr className={task.status === "COMPLETED" ? "completed-row" : ""}>
      <td>{index + 1}</td>

      <td>
        <strong>{task.title}</strong>
      </td>

      <td>{task.description}</td>

      {/* දෙවන කේතයෙන් ගත් dueDate එක මෙතැනට එකතු කර ඇත */}
      <td>{task.dueDate}</td>

      <td>
        <span
          style={{
            fontWeight: "bold",
            color: task.status === "COMPLETED" ? "#28a745" : "#ffc107", // Complete නම් කොළ, නැත්නම් කහ
          }}
        >
          {task.status}
        </span>
      </td>

      <td>
        <div style={{ display: "flex", gap: "10px" }}>
          {/* Task එක අවසන් කර නැත්නම් පමණක් 'Mark as Done' බොත්තම පෙන්වයි */}
          {task.status !== "COMPLETED" && (
            <button
              onClick={() => onComplete(task)}
              style={{
                padding: "6px 12px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Mark as Done
            </button>
          )}

          <button
            onClick={() => onDelete(task.id)}
            style={{
              padding: "6px 12px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TaskItem;
