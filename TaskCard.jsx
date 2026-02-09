import React from "react";

export default function TaskCard({ task, onDone }) {
  const { id, title, description } = task;

 return (
  <div
    data-testid={`task-${id}`}
    style={{
      backgroundColor: "#f0f0f0",
      borderRadius: "8px",
      padding: "12px",
      marginBottom: "12px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <button onClick={() => onDone(id)} style={{ borderRadius: "5px", height: "40px" }}>
        Done
      </button>
    </div>
  </div>
);

}
