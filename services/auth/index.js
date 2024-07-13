const express = require("express");
const app = express()
app.use(express.json());
require('dotenv').config()
const amqplib = require('amqplib/callback_api');
const queue = 'tasks';


const {FormateData,CreateChannel,PublishMessage,SubscribeMessage,PublishDbEvent,recieveMsg}=require("./utils/utils")



app.get("/",(req,res)=>{
    return res.status(200).json({"msg": "Hello from auth"})
})

app.post("/register",(req,res)=>{
    return res.status(200).json(req.body)
})

app.post("/login",(req,res)=>{
    return res.status(200).json(req.body)})


    const startChannel = async ()=>{
      await  PublishMessage(process.env.MSG_QUEUE_URL,process.env.EXCHANGE_NAME,process.env.AUTH_SERVICE,process.env.AUTH_SERVICE,'Action',"better than")   
     await recieveMsg(process.env.MSG_QUEUE_URL,process.env.EXCHANGE_NAME)

    }
    startChannel()
   



app.listen(process.env.AUTH_PORT, () => {
    console.log(`Auth service is Listening to Port ${process.env.AUTH_PORT}`)
})