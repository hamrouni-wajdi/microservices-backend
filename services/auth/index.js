const express = require("express");
const app = express()
app.use(express.json());
require('dotenv').config()

app.get("/",(req,res)=>{
    return res.status(200).json({"msg": "Hello from auth"})
})

app.listen(process.env.AUTH_PORT, () => {
    console.log(`Auth service is Listening to Port ${process.env.AUTH_PORT}`)
})