import axios from 'axios';

const TaskCard = ({ task, setEditingTask, setIsModalOpen, fetchTasks }) => {
  const priorityColors = {
    Low: 'green',
    Medium: 'yellow',
    High: 'red'
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${task._id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span className="assigned-to">{task.assignedTo || 'Unassigned'}</span>
      <span className="priority" style={{ backgroundColor: priorityColors[task.priority] }}>
        {task.priority}
      </span>
      {task.dueDate && (
        <p className="due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      )}
      <div className="task-actions">
        <button onClick={() => {
          setEditingTask(task);
          setIsModalOpen(true);
        }}>Edit</button>
        <button className="delete" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;