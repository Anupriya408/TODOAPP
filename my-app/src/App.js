import React, { useState, useEffect } from 'react';
import './Todo.css';

const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/users/1/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    // Fetch initial todos from the API 
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      alert('Task name cannot be empty!');
      return;
    }

    const newTodo = {
      userId: 1,
      id: todos.length + 1,
      title: newTask,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTask('');
  };

  const handleToggleCompletion = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTask = (id, newTitle) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = showCompleted
    ? todos.filter((todo) => todo.completed)
    : todos;

  return (
    <div className="App">
      <h1>TODO APP</h1>
      <div>
        <input
          type="text"
          placeholder="Enter New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add New Task</button>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
          Show All Task Completed
        </label>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span
              
              className={todo.completed ? 'completed' : '' }
              onClick={() => handleToggleCompletion(todo.id)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleEditTask(todo.id, prompt('Edit the task:', todo.title))}>
              Edit Task
            </button>
            <button onClick={() => handleDeleteTask(todo.id)}>Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
