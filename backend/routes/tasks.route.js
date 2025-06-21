const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/boards/:id/tasks", async(req,res)=>{
  try {
    const tasks = await Task.find({boardId: req.params.id});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' });
  }
});

router.post("/boards/:id/tasks",async (req,res)=>{
  try {
    const { title, description, status, priority, assignedTo, dueDate } = req.body;
    if(!title) return res.status(400).json({message: "Title is required"});

    const task = new Task({
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
      boardId: req.params.id
    });
    await task.save();
    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' });
  }
});

router.put("/tasks/:id",async(req,res)=>{
  try {
    const { title, description, status, priority, assignedTo, dueDate } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id,{
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
    })
    if(!task) return res.status(404).json("Task not found");
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' });
  }
})

router.delete("/tasks/:id",async(req,res)=>{
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) return res.status(404).json({message:"Task not found"});
    res.status(200).json({message: "Task deleted"});
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
})

module.exports = router;