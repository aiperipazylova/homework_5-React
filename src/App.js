import React, { useState, useEffect } from 'react';
import { initialTodos } from './todos';
import createTodos from './todos';
import './Todolist.css';

export default function Todolist() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [activeTodos, setActiveTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState([]);
  const [footer, setFooter] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    setActiveTodos(todos.filter((todo) => !todo.completed));
  }, [todos]);

  useEffect(() => {
    if (!showActive && !showCompleted) {
      setVisibleTodos(todos);
    } else {
      setVisibleTodos(
        showActive
          ? activeTodos
          : showCompleted
          ? todos.filter((todo) => todo.completed)
          : todos
      );
    }
  }, [showActive, showCompleted, todos, activeTodos]);

  useEffect(() => {
    setFooter(<footer>{activeTodos.length} todos left</footer>);
  }, [activeTodos]);

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setEditedText(todo.text);
  };

  const handleSaveEdit = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editingTodo.id ? { ...todo, text: editedText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleShowActiveChange = () => {
    setShowActive(true);
    setShowCompleted(false);
  };

  const handleShowCompletedChange = () => {
    setShowActive(false);
    setShowCompleted(true);
  };

  return (
    <div className="todo-app">
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={handleShowActiveChange}
        />
        Show only active todos
      </label>
      <label>
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={handleShowCompletedChange}
        />
        Show only completed todos
      </label>
      <NewTodo onAdd={(newTodo) => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {editingTodo === todo ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => handleToggleComplete(todo.id)}
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                >
                  {todo.text}
                </span>
                <button onClick={() => handleEditClick(todo)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {footer}
    </div>
  );
}

function NewTodo({ onAdd }) {
  const [text, setText] = useState('');

  function handleAddClick() {
    setText('');
    onAdd(createTodos(text));
  }

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddClick}>Add</button>
    </div>
  );
}