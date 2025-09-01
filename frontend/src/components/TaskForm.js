import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', { title });
      addTask(res.data);
      setTitle('');
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Nueva tarea"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="flex-1 border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">Agregar</button>
    </form>
  );
}

export default TaskForm;