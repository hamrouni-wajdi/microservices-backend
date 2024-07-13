const express = require("express");
const app = express()
app.use(express.json());
require('dotenv').config();
const amqplib = require('amqplib/callback_api');
const queue = 'tasks';



app.get("/",(req,res)=>{
    return res.status(200).json({"msg": "Hello from Payment"})
})

app.listen(process.env.PAYMENT_PORT, () => {
    console.log(`payment service is Listening to Port ${process.env.PAYMENT_PORT}`)
})

amqplib.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
  
    // Listener
//     conn.createChannel((err, ch2) => {
//       if (err) throw err;
  
//       ch2.assertQueue(queue);
  
//       ch2.consume(queue, (msg) => {
//         if (msg !== null) {
//           console.log(msg.content.toString());
//           ch2.ack(msg);
//         } 
//         else {
//           console.log('Consumer cancelled by server');
//         }
//       }
//     );
//     }
// );
  
    // Sender
    conn.createChannel((err, ch1) => {
      if (err) throw err;
  
      ch1.assertQueue(queue);
  
        ch1.sendToQueue(queue, Buffer.from('message from payment'));
    });
  });