import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import Checkbox from "./Checkbox";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
    isComplete: false,
  });

  const submitUpdate = (value) => {
    value.isComplete = edit.isComplete;
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
      isComplete: false,
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <Checkbox
        id={todo.id}
        key={todo.id}
        onClick={() => completeTodo(todo.id)}
        defaultChecked={todo.isComplete}
      />{" "}
      <label htmlFor={todo.id}>{todo.text}</label>
      <div className="icons">
        <button
          aria-label={"Delete"}
          style={{
            background: "none",
            border: "none",
            height: "34px",
            width: "34px",
            lineHeight: 0,
          }}
          onClick={() => removeTodo(todo.id)}
        >
          <RiCloseCircleLine className="delete-icon" />
        </button>
        <button
          aria-label={"Edit"}
          style={{
            background: "none",
            border: "none",
            height: "34px",
            width: "34px",
            lineHeight: 0,
          }}
          onClick={() =>
            setEdit({
              id: todo.id,
              value: todo.text,
              isComplete: todo.isComplete,
            })
          }
        >
          <TiEdit className="edit-icon" />
        </button>
      </div>
    </div>
  ));
}

export default Todo;
