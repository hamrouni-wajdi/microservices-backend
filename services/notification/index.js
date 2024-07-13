const express = require("express");
const app = express()
app.use(express.json());
require('dotenv').config();
const webPush = require('web-push');
const bodyParser = require('body-parser');

// Generate VAPID keys
const vapidKeys = webPush.generateVAPIDKeys();

console.log(vapidKeys, "vapidkeys");
webPush.setVapidDetails(
    'mailto:your-email@example.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  app.use(bodyParser.json());

  let subscriptions = [];
 
// Endpoint to save subscription objects
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({});
  });
  
  // Endpoint to trigger push notifications
  app.post('/sendNotification', (req, res) => {
    const notificationPayload = {
      notification: {
        title: 'New Notification',
        body: 'This is a push notification',
        icon: 'assets/icons/icon-512x512.png',
      },
    };
    const promises = subscriptions.map(sub => 
        webPush.sendNotification(sub, JSON.stringify(notificationPayload))
      );
    
      Promise.all(promises)
        .then(() => res.status(200).json({ message: 'Notifications sent' }))
        .catch(err => {
          console.error('Error sending notification:', err);
          res.sendStatus(500);
        });
    });

app.get("/",(req,res)=>{
    return res.status(200).json({"msg": "Hello from notification"})
})

app.listen(process.env.NOTIFICATION_PORT, () => {
    console.log(`Notification service is Listening to Port ${process.env.NOTIFICATION_PORT}`)
})