import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import * as api from "../api";

// Mock the API functions
jest.mock("../api");

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("loads and displays tasks", async () => {
    api.fetchTasks.mockResolvedValue([
      { id: 1, title: "Sample Task", description: "Sample Desc", is_done: false }
    ]);

    render(<App />);

    expect(api.fetchTasks).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText("Sample Task")).toBeInTheDocument();
      expect(screen.getByText("Sample Desc")).toBeInTheDocument();
    });
  });

  it("creates a new task", async () => {
    api.fetchTasks.mockResolvedValue([]); // Initial load
    api.createTask.mockResolvedValue({
      id: 2,
      title: "New Task",
      description: "New Description",
      is_done: false,
    });

    render(<App />);

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "New Task" },
    });

    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "New Description" },
    });

    fireEvent.click(screen.getByText("Create Task"));

    await waitFor(() => {
      expect(api.createTask).toHaveBeenCalledWith("New Task", "New Description");
    });
  });
});
