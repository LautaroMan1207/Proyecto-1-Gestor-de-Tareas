import React from 'react';
import axios from 'axios';

function TaskList({ tasks, updateTask, deleteTask }) {
  const toggleCompleted = async (task) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        completed: !task.completed
      });
      updateTask(res.data);
    } catch(err) {
      console.log(err);
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      deleteTask(id);
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
          <button onClick={() => removeTask(task._id)} className="text-red-600">Eliminar</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;