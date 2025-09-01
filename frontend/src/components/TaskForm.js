import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskForm({ editMode = false }) {
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (editMode && id) {
      axios.get('https://gestor-tareas-backend.onrender.com/api/tasks')
        .then(res => setTitle(res.data.title))
        .catch(err => console.log(err));
    }
  }, [editMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      if (editMode) {
        await axios.put(`https://gestor-tareas-backend.onrender.com/api/tasks/${id}`, { title });
      } else {
        await axios.post('https://gestor-tareas-backend.onrender.com/api/tasks', { title });
      }
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Título de la tarea"
        className="flex-1 border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">
        {editMode ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
}

export default TaskForm;
