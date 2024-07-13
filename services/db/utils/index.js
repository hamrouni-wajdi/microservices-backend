const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");
const dotenv = require("dotenv").config()

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
      const connection = await amqplib.connect(process.env.MSG_QUEUE_URL);
      const channel = await connection.createChannel();
      await channel.assertQueue(process.env.EXCHANGE_NAME, "direct", { durable: true });
      return channel;
    } catch (err) {
      throw err;
    }
  };
  
  module.exports.PublishMessage = (channel, service, msg) => {
    channel.publish(process.env.EXCHANGE_NAME, service, Buffer.from(msg));
    console.log("Sent: ", msg);
  };
  
  module.exports.SubscribeMessage = async (channel, service) => {
    await channel.assertExchange(process.env.EXCHANGE_NAME, "direct", { durable: true });
    const q = await channel.assertQueue("", { exclusive: true });
    console.log(`\n ======== Waiting for messages in queue: ${q.queue}=========== \n`);
  
    channel.bindQueue(q.queue, process.env.EXCHANGE_NAME, process.env.CUSTOMER_SERVICE);
  
    // channel.consume(
    //   q.queue,
    //   (msg) => {
    //     if (msg) {
    //       console.log("***** \n the message is: \n **********", msg.content.toString());
    //       // service.SubscribeEvents(msg.content.toString());
    //     }
    //     console.log("[X] received");
    //   },
    //   {
    //     noAck: true,
    //   }
    // );
    channel.consume(q.queue, (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        channel.ack(msg);
      } else {
        console.log('Consumer cancelled by server');
      }
    });

  };