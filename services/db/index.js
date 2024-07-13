const express = require("express");
const app = express()
app.use(express.json());
require('dotenv').config();
const mysql = require('mysql2/promise');
const amqplib = require('amqplib');
const db = require("./models")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {FormateData,CreateChannel,PublishMessage,SubscribeMessage,PublishDbEvent}=require("./utils/index")

// Sync Sequelize models with the database

db.sequelize.sync({ force: true })
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

app.get("/",(req,res)=>{
    return res.status(200).json({"msg": "Hello from DB"})
})


const startChannel = async()=>{
  const channel = await CreateChannel()
  SubscribeMessage(channel, process.env.CUSTOMER_SERVICE);
}
startChannel()

app.post("/register",async(req,res)=>{
  console.log("register customer ===============================")
  
  try {
      const { username, email, password, firstname,lastname,address,phone } = req.body;
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const customer = await db.Customer.create({
        username,
        email,
        firstname,
        lastname,
        password: hashedPassword,
        address,
        phone
      });
      customer.save()
      res.status(201).json({ customer });
    } catch (error) {
      console.error('Registration failed', error.message);
      res.status(500).json({ error: 'Registration failed' });
    }
})

app.post("/login",async(req,res)=>{
  try {
    const { username, password } = req.body;
    const customer = await db.Customer.findOne({ where: { username } });
    if (!customer) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }   
    // Compare the entered password with the hashed password in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const passwordMatch = await bcrypt.compare(password, customer.dataValues.password);

    if (!passwordMatch) {

      return res.status(401).json({ error: 'Invalid credentials' });
    }   
    // Generate a JWT token
    const token = jwt.sign({ customer: customer.id, username: customer.username }, process.env.APP_SECRET, {
      expiresIn: '1h',
    });
    res.json({ customer, token });
  } catch (error) {
    console.error('Login failed', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
})

app.post("/addProduct",async(req,res)=>{
  console.log("Add product ===============================")
  
  try {
      const { name, desc, banner, type,unit,price,available,supplier } = req.body;
  
      const product = await db.Product.create({ name, desc, banner, type,unit,price,available,supplier });
      product.save()
      res.status(201).json({ product });
    } catch (error) {
      console.error('Registration failed', error.message);
      res.status(500).json({ error: 'Registration failed' });
    }
})

app.post("/bulkProducts",async(req,res)=>{
  console.log("Add product list ===============================")
  
  try {
  
      const product = await db.Product.bulkCreate(req.body);
      res.status(201).json({ product });
    } catch (error) {
      console.error('Registration failed', error.message);
      res.status(500).json({ error: 'Registration failed' });
    }
})

app.get("/products",async(req,res)=>{
  console.log("Get all products ===============================")

  try {
    const product = await db.Product.findAll();
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
})


app.listen(process.env.DB_PORT, () => {
    console.log(`database service is Listening to Port ${process.env.DB_PORT}`)
})


