const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes=require("./routes/UserRoutes");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:4646@nodeapi.phxhhbz.mongodb.net/NETFLIX?retryWrites=true&w=majority").then(()=>{console.log("DB connected")})
app.use("/api/user",userRoutes)
app.listen(5000, console.log("server started"));
