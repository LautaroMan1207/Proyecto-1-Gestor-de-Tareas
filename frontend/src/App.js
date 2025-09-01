import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, []);

  const addTask = (task) => setTasks([...tasks, task]);
  const updateTask = (updatedTask) => setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t._id !== id));

  return (
    <div className="App p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestor de Tareas</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;