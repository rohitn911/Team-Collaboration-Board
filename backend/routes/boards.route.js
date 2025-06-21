const express = require("express");
const router = express.Router();
const Board = require("../models/Board");

router.get("/",async (req,res)=>{
  try{
    const boards = await Board.find().sort({createdAt: -1});
    res.json(boards);
  }
  catch(error){
    res.status(500).json({message: "Internal Server Error"})
  }
});

router.post("/",async (req,res)=>{
  try {
    const {name} = req.body;
    if(!name) return res.status(400).json({message: "Name is required"});
    const board = new Board({name});
    await board.save();
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
})

module.exports = router;