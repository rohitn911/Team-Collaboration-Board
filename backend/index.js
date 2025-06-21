require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const boardsRoute = require("./routes/boards.route");
const tasksRoute = require("./routes/tasks.route");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URI).then(()=>console.log("MONGO DB Connected")).catch((err)=>console.error("Some error occured while connect MongoDB ",err));


app.use('/api/boards',boardsRoute);
app.use('/api/',tasksRoute);

app.listen(PORT,()=>{
  console.log(`Server Started at PORT : ${PORT}`);
})