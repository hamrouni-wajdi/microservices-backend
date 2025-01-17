const express = require("express");
const app = express()
app.use(express.json());
require('dotenv').config();

app.get("/",(req,res)=>{
    return res.status(200).json({"msg": "Hello from AI service"})
})

app.listen(process.env.AI_PORT, () => {
    console.log(`AI service is Listening to Port ${process.env.AI_PORT}`)
})