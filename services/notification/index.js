const express = require("express");
const app = express()
app.use(express.json());
require('dotenv').config();

app.get("/",(req,res)=>{
    return res.status(200).json({"msg": "Hello from notification"})
})

app.listen(process.env.NOTIFICATION_PORT, () => {
    console.log(`Notification service is Listening to Port ${process.env.NOTIFICATION_PORT}`)
})