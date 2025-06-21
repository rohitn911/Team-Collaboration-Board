import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard.jsx';
import TaskModal from './TaskModal.jsx';

const BoardDetail = ({ board }) => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [board]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/boards/${board._id}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const statuses = ['To Do', 'In Progress', 'Done'];

  return (
    <div className="board-detail">
      <h1>{board.name}</h1>
      <button onClick={handleCreateTask}>Add Task</button>
      <div className="columns">
        {statuses.map(status => (
          <div key={status} className="column">
            <h2>{status}</h2>
            {tasks
              .filter(task => task.status === status)
              .map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  setEditingTask={setEditingTask}
                  setIsModalOpen={setIsModalOpen}
                  fetchTasks={fetchTasks}
                />
              ))}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <TaskModal
          boardId={board._id}
          task={editingTask}
          setIsModalOpen={setIsModalOpen}
          fetchTasks={fetchTasks}
        />
      )}
    </div>
  );
};

export default BoardDetail;