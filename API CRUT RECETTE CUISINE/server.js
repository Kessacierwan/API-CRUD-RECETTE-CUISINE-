const express = require ("express");
const mongoose = require("mongoose");
const cors = require("cors")
const recipeRouter = require ("./routers/recipeRouter")
const userRouter = require("./routers/userRouter")

const app = express();
app.use(cors());
app.use(express.json());
app.use(recipeRouter);
app.use(userRouter);

app.listen(3000,(err)=>{
    if (err){
        console.log(err)
    }else {
        console.log("connecté sur le port 3000")
    }
    
})

mongoose.connect ('mongodb://127.0.0.1:27017/recipes')