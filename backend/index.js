const express= require("express");
const cors= require("cors");
const { userRouter } = require("./router/userRouter");
require("dotenv").config();

const PORT= process.env.PORT || 8080;

const app= express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome...") 
}) ;

app.use("/users",userRouter);

app.listen(PORT,()=>{
    console.log(`Server Started on Port No. ${PORT}`);
})


