const express = require("express");
const app = express()
app.use(express.json());
require('dotenv').config();
const mysql = require('mysql2/promise');

const sequelize = require('./connection.js'); // Import Sequelize connection
// Sync Sequelize models with the database
sequelize.sync()
  .then(() => {
    console.log('Database and tables synchronized.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.get("/",(req,res)=>{
    return res.status(200).json({"msg": "Hello from DB"})
})

app.listen(process.env.DB_PORT, () => {
    console.log(`database service is Listening to Port ${process.env.DB_PORT}`)
})