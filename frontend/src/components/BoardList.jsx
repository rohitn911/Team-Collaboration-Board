import { useState, useEffect } from 'react';
import axios from 'axios';

const BoardList = ({ setSelectedBoard }) => {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/boards`);
      setBoards(response.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const createBoard = async () => {
    if (!newBoardName.trim()) return;
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/boards`, { name: newBoardName });
      setBoards([...boards, response.data]);
      setNewBoardName('');
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  return (
    <div className="sidebar">
      <h2>Boards</h2>
      <div className="board-form">
        <input
          type="text"
          placeholder="New board name"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
        <button onClick={createBoard}>Add Board</button>
      </div>
      <ul>
        {boards.map(board => (
          <li
            key={board._id}
            className="board-item"
            onClick={() => setSelectedBoard(board)}
          >
            {board.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;