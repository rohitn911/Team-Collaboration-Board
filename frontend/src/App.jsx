import { useState } from 'react';
import BoardList from './components/BoardList.jsx';
import BoardDetail from './components/BoardDetail.jsx';

const App = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);

  return (
    <div className="app-container">
      <BoardList setSelectedBoard={setSelectedBoard} />
      {selectedBoard && <BoardDetail board={selectedBoard} />}
    </div>
  );
};

export default App;