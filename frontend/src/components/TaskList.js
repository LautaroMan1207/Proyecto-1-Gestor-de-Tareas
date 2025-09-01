import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskList({ tasks, updateTask, deleteTask }) {
  const navigate = useNavigate();

  const toggleCompleted = async (task) => {
    try {
      const res = await axios.put(`https://gestor-tareas-backend.onrender.com/api/tasks/${task._id}`, {
        completed: !task.completed
      });
      updateTask(res.data);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id} className="flex justify-between items-center mb-2 p-2 border rounded">
          <span
            onClick={() => toggleCompleted(task)}
            className={task.completed ? "line-through cursor-pointer" : "cursor-pointer"}
          >
            {task.title}
          </span>
          <div className="flex gap-2">
            <button onClick={() => navigate(`/edit/${task._id}`)} className="text-yellow-600">Editar</button>
            <button onClick={() => deleteTask(task._id)} className="text-red-600">Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
