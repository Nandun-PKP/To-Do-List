import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Calendar එකේ මූලික පෙනුම
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Upcoming({ tasks, onAdd, onComplete, onDelete }) {
  // හෙට දිනය Default ලෙස තැබීම
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(tomorrowStr);

  // තෝරාගත් දිනයට අදාළ Tasks පමණක් පෙරා ගැනීම
  const filteredTasks = tasks.filter((task) => task.dueDate === selectedDate);

  // දැනට Tasks තිබෙන දින සියල්ලම Array එකකට ගැනීම (Dot එක පෙන්වීමට)
  const taskDates = tasks.map((task) => task.dueDate);

  // Calendar එකෙන් දවසක් Select කළ විට ක්‍රියාත්මක වන Function එක
  const handleDateChange = (date) => {
    // Timezone ගැටළු මඟහරවා ගනිමින් Date object එක නිවැරදිව "YYYY-MM-DD" ආකෘතියට හැරවීම
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    setSelectedDate(localDate.toISOString().split("T")[0]);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap", // Screen එක කුඩා නම් පහළට වැටීමට
          gap: "20px",
        }}
      >
        <div>
          <h2>Upcoming Tasks</h2>
          <p style={{ fontWeight: "bold", color: "#555" }}>
            Selected Date:{" "}
            <span style={{ color: "#007bff" }}>{selectedDate}</span>
          </p>
        </div>

        {/* Custom Calendar එක මෙතැනින් පෙන්වයි */}
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <Calendar
            onChange={handleDateChange}
            value={new Date(selectedDate)}
            tileContent={({ date, view }) => {
              // පෙන්වන්නේ මාසය නම් පමණක් දින පරීක්ෂා කරයි
              if (view === "month") {
                const offset = date.getTimezoneOffset();
                const localDate = new Date(date.getTime() - offset * 60 * 1000);
                const dateStr = localDate.toISOString().split("T")[0];

                // අදාළ දිනයට Task එකක් තිබේ නම් රතු පාට තිත පෙන්වයි
                if (taskDates.includes(dateStr)) {
                  return <div className="task-dot"></div>;
                }
              }
              return null;
            }}
          />
        </div>
      </div>

      <hr style={{ margin: "30px 0", borderTop: "1px solid #ddd" }} />

      {/* තෝරාගත් දිනයට අදාළව අලුත් Task එකක් එකතු කිරීමේ Form එක */}
      <TaskForm onAddTask={onAdd} defaultDate={selectedDate} />

      {/* තෝරාගත් දිනයට අදාළ Tasks ලැයිස්තුව පෙන්වීම */}
      <TaskList
        tasks={filteredTasks}
        onComplete={onComplete}
        onDelete={onDelete}
      />
    </div>
  );
}

export default Upcoming;
