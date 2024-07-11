const express = require("express");
const app = express()
app.use(express.json());
require('dotenv').config();

app.get("/",(req,res)=>{
    return res.status(200).json({"msg": "Hello from DB"})
})

app.listen(process.env.DB_PORT, () => {
    console.log(`database service is Listening to Port ${process.env.DB_PORT}`)
})