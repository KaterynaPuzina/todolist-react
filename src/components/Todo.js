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
        key={todo.id}
        onClick={() => completeTodo(todo.id)}
        defaultChecked={todo.isComplete}
      />{" "}
      {todo.text}
      <span className="checkmark"></span>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() =>
            setEdit({
              id: todo.id,
              value: todo.text,
              isComplete: todo.isComplete,
            })
          }
          className="edit-icon"
        />
      </div>
    </div>
  ));
}

/*<div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>*/

/*     <div key={todo.id}>
      <Checkbox
        onClick={() => completeTodo(todo.id)}
        defaultChecked={todo.isComplete}
      />
      <div onClick={() => completeTodo(todo.id)}>{todo.text}</div>
    </div>*/

export default Todo;
