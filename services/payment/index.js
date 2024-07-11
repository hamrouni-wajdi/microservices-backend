const express = require("express");
const app = express()
app.use(express.json());
require('dotenv').config();

app.get("/",(req,res)=>{
    return res.status(200).json({"msg": "Hello from Payment"})
})

app.listen(process.env.PAYMENT_PORT, () => {
    console.log(`payment service is Listening to Port ${process.env.PAYMENT_PORT}`)
})