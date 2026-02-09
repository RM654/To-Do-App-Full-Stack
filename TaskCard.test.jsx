import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "../components/TaskCard";

describe("TaskCard", () => {
  const task = {
    id: 1,
    title: "Test Task",
    description: "This is a test",
  };

  it("renders title and description", () => {
    render(<TaskCard task={task} onDone={() => {}} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("This is a test")).toBeInTheDocument();
  });

  it("calls onDone when 'Done' button is clicked", () => {
    const mockOnDone = jest.fn();
    render(<TaskCard task={task} onDone={mockOnDone} />);
    fireEvent.click(screen.getByText("Done"));
    expect(mockOnDone).toHaveBeenCalledWith(1);
  });
});
