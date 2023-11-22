//publisher.js
const mqtt = require('mqtt');
require('dotenv').config();

//the client id is used by the MQTT broker to keep track of clients and and their // state
const clientId = 'mqttjs_' + Math.random().toString(8).slice(2, 4);
console.log(clientId);

// console.log(process.env.BROKER_URL, 'client', clentId)
const client = mqtt.connect('mqtt://3.95.66.199:1883', {
  clientId: clientId,
  clean: false,
  username: 'user1',
  password: 'namth',
});
const topicName = 'test/connection';

client.on('connect', function (connack) {
  console.log('client connected', connack);
  // on client connection publish messages to the topic on the server/broker
  // const payload = { 1: 'Hello world', 2: 'Welcome to the test connection' };
  // client.publish("iot/accelerometer", JSON.stringify(payload), { qos: 0, retain: false }, (PacketCallback, err) => {
  //   if (err) {
  //     console.log(err, 'MQTT publish packet');
  //   }
  // });
  
  //assuming messages comes in every 3 seconds to our server and we need to publish or process these messages
  setInterval(() => console.log('Message published'), 20000);
});

client.on('error', function (err) {
  console.log('Error: ' + err);
  if (err.code == 'ENOTFOUND') {
    console.log('Network error, make sure you have an active internet connection');
  }
});

client.on('close', function () {
  console.log('Connection closed by client');
});

client.on('reconnect', function () {
  console.log('Client trying a reconnection');
});

client.on('offline', function () {
  console.log('Client is currently offline');
});
// Unsubscribe before subscribing to avoid duplicates
client.unsubscribe("iot/accelerometer", (err) => {
  if (err) {
    console.log(err, 'MQTT unsubscribe error');
  }

  // Subscribe to the topic
  client.subscribe("iot/accelerometer", { qos: 0 }, (err) => {
    if (err) {
      console.log(err, 'MQTT subscribe error');
    }
  });
});
client.on("message", (topic, payload, e) => {
  console.log(`Message received on topic ${topic}: ${payload}`,e);
});