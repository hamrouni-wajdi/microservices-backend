const express = require("express");
const app = express()
app.use(express.json());
require('dotenv').config();
const amqplib = require('amqplib/callback_api');
const bodyParser = require('body-parser');
const stripe = require('stripe')('YOUR_SECRET_KEY'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
      });
  
      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

app.get("/",(req,res)=>{
    return res.status(200).json({"msg": "Hello from Payment"})
})

app.listen(process.env.PAYMENT_PORT, () => {
    console.log(`payment service is Listening to Port ${process.env.PAYMENT_PORT}`)
})

