import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import TodoList from "./TodoList";

test("Type todo task and show on display", async () => {
  render(<TodoList />);

  const input = screen.getByRole("textbox");
  await userEvent.type(input, "read a book");

  const addButton = screen.getByRole("button", { name: /add todo/i });
  await userEvent.click(addButton);

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).toBeInTheDocument();

  const labelTask1 = screen.getByLabelText(/read a book/i);
  expect(labelTask1).toBeInTheDocument();

  await userEvent.type(input, "wash a car");
  await userEvent.click(addButton);

  const labelTask2 = screen.getByLabelText(/wash a car/i);
  expect(labelTask2).toBeInTheDocument();
});

test("Check previous state saved in memory", async () => {
  render(<TodoList />);

  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes.length).toBe(2);

  const labelTask1 = screen.getByLabelText(/read a book/i);
  expect(labelTask1).toBeInTheDocument();

  const labelTask2 = screen.getByLabelText(/wash a car/i);
  expect(labelTask2).toBeInTheDocument();
});

test("Check one task as done", async () => {
  render(<TodoList />);

  const labelTask1 = screen.getByLabelText(/read a book/i);
  expect(labelTask1).toBeInTheDocument();

  await userEvent.click(labelTask1);

  expect(labelTask1).toBeChecked();
});

test("Uncheck it as undone", async () => {
  render(<TodoList />);

  const labelTask1 = screen.getByLabelText("read a book");
  expect(labelTask1).toBeInTheDocument();

  await userEvent.click(labelTask1);

  expect(labelTask1).not.toBeChecked();
});

test("Edit existing task", async () => {
  render(<TodoList />);

  const [editButton] = screen.getAllByLabelText(/edit/i);
  expect(editButton).toBeInTheDocument();

  await userEvent.click(editButton);

  const inputEdit = screen.getByRole("textbox", { name: /edit todo/i });
  await userEvent.type(inputEdit, "read a good book");

  const updateButton = screen.getByRole("button", { name: /update/i });
  await userEvent.click(updateButton);

  const labelTask = screen.getByLabelText(/read a good book/i);
  expect(labelTask).toBeInTheDocument();
});

test("Delete existing task", async () => {
  render(<TodoList />);

  const [deleteButton] = screen.getAllByLabelText(/delete/i);
  expect(deleteButton).toBeInTheDocument();

  await userEvent.click(deleteButton);

  const deletedTask = screen.queryByLabelText(/read a good book/i);
  expect(deletedTask).toBeNull();
});
