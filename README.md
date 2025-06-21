# 🧩 Team Collaboration Board

A minimal Trello/Asana-inspired collaboration tool built with React (frontend) and Node.js/Express (backend). Manage boards and tasks with a clean and simple interface.

- **GitHub Repository**: https://github.com/rohitn911/Team-Collaboration-Board  
- **Live Demo**: https://your-deployed-app.com

---

## 📦 Features

- **Boards**: Create and manage multiple project boards.
- **Tasks**:
  - Add, edit, and delete tasks.
  - Fields include title, description, status, priority, assigned user, and due date.
- **Board View**: Tasks appear in columns (To Do, In Progress, Done).
- **UI**: Simple CSS-styled components with modals and task cards.

---

## 🔧 Setup Instructions

### 🛑 Prerequisites

- Node.js (v16 or later)
- npm (comes with Node.js)
- Git (for cloning)
- MongoDB (if using a database)

---

### 📂 Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd team-collaboration-board/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) If using MongoDB, install `mongoose`:

   ```bash
   npm install mongoose
   ```

4. Create a `.env` file in the `backend/` directory:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/yourdb
   ```

5. Start the backend server:

   ```bash
   npm start
   ```

   If `npm start` doesn’t work, try:

   ```bash
   node server.js
   ```

6. Verify it runs at http://localhost:3000

7. Test the API (use browser or Postman):

   http://localhost:3000/api/boards

---

### 💻 Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd team-collaboration-board/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open in your browser:

   http://localhost:5000

   The frontend is proxied to the backend at http://localhost:3000 via Vite config.

5. Try adding a board or task to test the full flow.

---

## 🌟 Bonus Features

- 🔁 Real-time updates
- 📱 Responsive UI

---

## 🧑‍💻 Author

**Rohit Negi**  
GitHub: https://github.com/rohitn911

---

## 📝 License

This project is open-source and available under the MIT License.
