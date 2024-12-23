import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const todoInputRef = useRef(null);

  const handleSaveTodo = () => {
    const newTodo = todoInputRef.current.value.trim();
    if (!newTodo) return;

    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? newTodo : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }
    todoInputRef.current.value = "";
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const Edit = (index) => {
    todoInputRef.current.value = todos[index];
    setEditIndex(index);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-3">To-Do List</h1>
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <div className="input-group  mb-3">
            <input
              type="text"
              ref={todoInputRef}
              className="form-control fw-4"
              placeholder="Enter a task"
            />
            <button
              onClick={handleSaveTodo}
              className="btn btn-primary p-2 ms-3 rounded"
            >
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>
          <ul className="list-group">
            {todos.map((todo, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {todo}
                <div>
                  <button
                    onClick={() => Edit(index)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} /> Edit
                  </button>
                  <button
                    onClick={() => removeTodo(index)}
                    className="btn btn-danger btn-sm"
                  >
                    <FontAwesomeIcon icon={faTrashCan} /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;
