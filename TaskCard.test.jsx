import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "../components/TaskCard";

describe("TaskCard", () => {
  const task = {
    id: 1,
    title: "Test Task",
    description: "Test Description"
  };

  test("renders task title and description", () => {
    render(<TaskCard task={task} onDone={() => {}} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  test("calls onDone when Done button is clicked", () => {
    const onDone = jest.fn();
    render(<TaskCard task={task} onDone={onDone} />);
    fireEvent.click(screen.getByText("Done"));
    expect(onDone).toHaveBeenCalledWith(task.id);
  });
});
