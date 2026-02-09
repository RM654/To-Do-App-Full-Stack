import React, { useState, useEffect } from "react";
import { fetchTasks, createTask, markDone } from "./api";
import TaskCard from "./components/TaskCard";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createTask(title, description);
    setTitle("");
    setDescription("");
    loadTasks();
  };

  // <<< ADD THIS FUNCTION
  const handleDone = async (taskId) => {
    try {
      await markDone(taskId);
      loadTasks();
    } catch (error) {
      console.error("Failed to mark task as done:", error);
    }
  };

  return (
  <div
    style={{
      maxWidth: "900px",
      margin: "0 auto",
      height: "100vh",
      display: "flex",
      gap: "0",
      alignItems: "center",
    }}
  >
    {/* Left side - form */}
    <div
      style={{
        flex: 1,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <h1>To‑Do List</h1>
        <form onSubmit={handleCreate} style={{ marginBottom: "20px" }}>
          <div>
            <label htmlFor="title">Title:</label><br />
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-label="Title"
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label><br />
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-label="Description"
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Create Task
          </button>
        </form>
      </div>
    </div>

    {/* Divider */}
    <div style={{ width: "1px", backgroundColor: "#ccc", height: "60%" }} />

    {/* Right side - task list */}
    <div
      style={{
        flex: 1,
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDone={handleDone} />
        ))}
        {tasks.length === 0 && <p>No pending tasks.</p>}
      </div>
    </div>
  </div>
);

}
