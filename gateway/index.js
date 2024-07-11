const express = require("express");
const app = express();
const cors = require("cors");
const proxy = require("express-http-proxy");
const dotenv = require("dotenv");
require('dotenv').config()

app.use(cors());
app.use(express.json());

app.use('/db',proxy("http://localhost:8000"));
app.use("/auth", proxy("http://localhost:8001"));
app.use("/payement", proxy("http://localhost:8002"));
app.get("/",(req,res)=>{
    res.status(200).json({msg:"gateway working"})
})

app.listen(process.env.GATEWAY_PORT, () => {
    console.log(`gateway is Listening to Port ${process.env.GATEWAY_PORT}`)
})