import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import * as api from "../api";

jest.mock("../api");

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders tasks", async () => {
    api.fetchTasks.mockResolvedValue([
      {
        id: 1,
        title: "Test Task",
        description: "Test Desc",
        is_done: false
      }
    ]);

    render(<App />);

    expect(api.fetchTasks).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
      expect(screen.getByText("Test Desc")).toBeInTheDocument();
    });
  });

  test("creates a new task", async () => {
    api.fetchTasks.mockResolvedValue([]);
    api.createTask.mockResolvedValue({
      id: 2,
      title: "New Task",
      description: "New Desc",
      is_done: false
    });

    render(<App />);

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "New Task" }
    });

    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "New Desc" }
    });

    fireEvent.click(screen.getByText("Create Task"));

    await waitFor(() => {
      expect(api.createTask).toHaveBeenCalledWith("New Task", "New Desc");
    });
  });
});
