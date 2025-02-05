import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/tasks', { title, description });
    fetchTasks();
    setTitle('');
    setDescription('');
  };

  // Edit task
  const editTask = (task) => {
    setUpdateMode(true);
    setTitle(task.title);
    setDescription(task.description);
    setCurrentTaskId(task._id);
  };

  // Update task
  const updateTask = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/tasks/${currentTaskId}`, { title, description });
    fetchTasks();
    setTitle('');
    setDescription('');
    setUpdateMode(false);
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={updateMode ? updateTask : addTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">{updateMode ? 'Update Task' : 'Add Task'}</button>
      </form>

      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => editTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
