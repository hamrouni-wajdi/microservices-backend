const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const amqplib = require('amqplib/callback_api');
const dotenv = require("dotenv")
const axios = require("axios");

const APP_SECRET= process.env.APP_SECRET
EXCHANGE_NAME= process.env.EXCHANGE_NAME
MSG_QUEUE_URL= process.env.MSG_QUEUE_URL
CUSTOMER_SERVICE= "customer_service"
PRODUCT_SERVICE= "PRODUCT_SERVICE"

module.exports.FormateData = (data) => {
    if (data) {
      return { data };
    } else {
      throw new Error("Data Not found!");
    }
  };
  
  //Message Broker
  module.exports.CreateChannel = async () => {
    try {
      const connection = await amqplib.connect(MSG_QUEUE_URL);
      const channel = await connection.createChannel();
      await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
      return channel;
    } catch (err) {
      throw err;
    }
  };
  
  module.exports.formatMsg=(sender,reciever, action,payload)=>{sender,reciever, action,payload}
  
  module.exports.PublishMessage = (hostUrl,queue ,sender,reciever, action,payload) => {
    amqplib.connect(hostUrl, (err, conn) => {
      if (err) throw err;
      // Sender
      const msg = {sender,reciever, action,payload}
      conn.createChannel((err, ch1) => {
        if (err) throw err;
    
        ch1.assertQueue(queue);
    
          ch1.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
      });
    });
  };
  
 module.exports.recieveMsg = (hostUrl,queue,cb)=>{
  amqplib.connect(hostUrl, (err, conn) => {
    if (err) throw err;
  
    conn.createChannel((err, ch2) => {
      if (err) throw err;
  
      ch2.assertQueue(queue);
  
      ch2.consume(queue, (msg) => {
        if (msg !== null) {
          console.log(msg.content.toString());
          ch2.ack(msg);
          if(cb){
            cb(msg.content.toString())
          }
        } 
        else {
          console.log('Consumer cancelled by server');
        }
      }
    );
    }
 );
  
 })}

  module.exports.SubscribeMessage = async (channel, service) => {
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
    const q = await channel.assertQueue("", { exclusive: true });
    console.log(` Waiting for messages in queue: ${q.queue}`);
  
    channel.bindQueue(q.queue, EXCHANGE_NAME, CUSTOMER_SERVICE);
  
    channel.consume(
      q.queue,
      (msg) => {
        if (msg.content) {
          console.log("the message is:", msg.content.toString());
          // service.SubscribeEvents(msg.content.toString());
        }
        console.log("[X] received");
      },
      {
        noAck: true,
      }
    );
  };

  module.exports.PublishDbEvent = async (payload) => {
    axios.post("http://db:8001/app-events/", {
      payload,
    });
  
    //     axios.post(`${BASE_URL}/customer/app-events/`,{
    //         payload
    //     });
  };