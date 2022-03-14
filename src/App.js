import { useState, useRef } from "react";
import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { RiAddBoxFill } from "react-icons/ri";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");
  const [editTodoIndex, setEditTodoIndex] = useState(null);
  const ref = useRef();

  const onAddNote = () => {
    if (input === "") {
      alert("Input must be filled out");
    } else {
      setTodoList([...todoList, { id: todoList.length + 1, title: input }]);
      setInput("");
    }
    ref.current.focus();
  };

  const onCancelEditTodo = () => {
    setInput("");
    setEditTodoIndex(null);
  };

  const handleDelete = (id) => () => {
    const todoRemaining = todoList.filter((todo) => {
      return todo.id !== id;
    });
    setTodoList(todoRemaining);
  };

  const handleChangeInput = (e) => {
    setInput(e.target.value);
  };

  const onEditTodo = (todo, index) => () => {
    setInput(todo);
    setEditTodoIndex(index);
  };

  const onSaveTodo = () => {
    todoList[editTodoIndex].title = input;
    setEditTodoIndex(null);
    setTodoList([...todoList]);
    setInput("");
  };

  const isEditing = editTodoIndex !== null;

  return (
    <div className="container">
      <div className="title">Todo App</div>
      <br />

      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          className="input-field"
          placeholder="Add your new todo"
          type="text"
          ref={ref}
          value={input}
          onChange={handleChangeInput}
        />
        <button
          className="btn-icon-add"
          onClick={isEditing ? onSaveTodo : onAddNote}
        >
          {isEditing ? <button className="btn-save">Save</button> : <RiAddBoxFill />}
        </button>
        {isEditing && (
          <button className="btn-cancel" onClick={onCancelEditTodo}>
            Cancel
          </button>
        )}
      </div>
      <ul className="list-todo">
        {todoList.map((job, index) => (
          <li className="list-item" key={job.id}>
            <div className="list-name">
              <span>
              {index + 1}. {job.title}
              </span>
            <button className="btn-edit" onClick={onEditTodo(job.title, index)}>
              Edit
            </button>
            <button className="btn-icon-delete" onClick={handleDelete(job.id)}>
              <BsFillTrashFill />
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
