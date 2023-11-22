//publisher.js
const mqtt = require('mqtt');
require('dotenv').config();

//the client id is used by the MQTT broker to keep track of clients and and their // state
const clientId = 'mqttjs_' + Math.random().toString(8).slice(2, 4);
console.log(clientId);

// console.log(process.env.BROKER_URL, 'client', clentId)
const client = mqtt.connect('mqtt://3.95.66.199:1883', {
  clientId: clientId,
  clean: true,
  username: 'user1',
  password: 'namth',
});
const topicName = 'test/connection';

client.on('connect', function (connack) {
  console.log('client connected', connack);
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


// on client connection publish messages to the topic on the server/broker
const payload = { 1: 'Hello w343434343orld', 2: 'Welcome to the test connection' };
client.publish("iot/accelerometer", JSON.stringify(payload), { qos: 0, retain: false }, (PacketCallback, err) => {
  if (err) {
    console.log(err, 'MQTT publish packet');
  }
});