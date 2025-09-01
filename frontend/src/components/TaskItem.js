import React from 'react';

function TaskItem({ task, onUpdate, onDelete }) {
  return (
    <li>
      <span
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          cursor: 'pointer'
        }}
        onClick={() => onUpdate(task._id, { ...task, completed: !task.completed })}
      >
        {task.title}
      </span>
      <button onClick={() => onDelete(task._id)}>Eliminar</button>
    </li>
  );
}

export default TaskItem;