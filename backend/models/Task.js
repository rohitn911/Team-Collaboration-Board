const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    trim: true,
  },
  description:{
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum : ['To Do','In Progress', 'Done'],
    default: 'To Do',
  },
  priority: {
    type: String,
    enum : ['Low','Medium', 'High'],
    default: 'Low',
  },
  assignedTo :{
    type: String,
    trim: true,
  },
  dueDate: {
    type: Date,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
  createdAt: { 
    type: Date, default: Date.now() 
  }
});

module.exports = mongoose.model('Task', taskSchema);