const express = require("express");
const app = express()
app.use(express.json());
require('dotenv').config();
const mysql = require('mysql2/promise');
const amqplib = require('amqplib');
const db = require("./models")


// Sync Sequelize models with the database

db.sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

app.get("/",(req,res)=>{
    return res.status(200).json({"msg": "Hello from DB"})
})

app.listen(process.env.DB_PORT, () => {
    console.log(`database service is Listening to Port ${process.env.DB_PORT}`)
})


