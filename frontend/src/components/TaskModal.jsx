import { useState, useEffect } from 'react';
import axios from 'axios';

const TaskModal = ({ boardId, task, setIsModalOpen, fetchTasks }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Low',
    assignedTo: '',
    dueDate: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'To Do',
        priority: task.priority || 'Low',
        assignedTo: task.assignedTo || '',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'To Do',
        priority: 'Low',
        assignedTo: '',
        dueDate: ''
      });
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    try {
      const payload = {
        title: formData.title,
        description: formData.description || undefined,
        status: formData.status,
        priority: formData.priority,
        assignedTo: formData.assignedTo || undefined,
        dueDate: formData.dueDate || undefined
      };
      if (task) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${task._id}`, payload);
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/boards/${boardId}/tasks`, payload);
      }
      fetchTasks();
      setIsModalOpen(false);
      setError('');
    } catch (error) {
      console.error('Error saving task:', error);
      setError('Failed to save task. Please try again.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{task ? 'Edit Task' : 'Add Task'}</h3>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="form-group">
            <label>Assigned To</label>
            <input
              type="text"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => {
              setIsModalOpen(false);
              setError('');
            }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
