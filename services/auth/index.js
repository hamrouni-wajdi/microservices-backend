const express = require("express");
const app = express()
app.use(express.json());
require('dotenv').config()

const {FormateData,CreateChannel,PublishMessage,SubscribeMessage,PublishDbEvent}=require("./utils/utils")

const startChannel = async ()=>{
    const channel = await CreateChannel();
    PublishMessage(channel, process.env.CUSTOMER_SERVICE, "message ===================================");
}
startChannel()

app.get("/",(req,res)=>{
    return res.status(200).json({"msg": "Hello from auth"})
})

app.post("/register",(req,res)=>{
    return res.status(200).json(req.body)
})

app.post("/login",(req,res)=>{
    return res.status(200).json(req.body)})

app.listen(process.env.AUTH_PORT, () => {
    console.log(`Auth service is Listening to Port ${process.env.AUTH_PORT}`)
})