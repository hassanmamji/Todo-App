import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setTaskInput(""); 
    }
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-app">
      <h1>TODO App</h1>

      <input
        type="text"
        value={taskInput}
        onChange={handleInputChange}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <span onClick={() => toggleCompletion(task.id)}>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
