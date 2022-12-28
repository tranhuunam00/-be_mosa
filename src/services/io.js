const socket = require('socket.io');
const logger = require('../utils/logger');
const httpResponses = require('../utils/httpResponses');
const { detectIntent } = require('./df');

var socketArray = {};
const createSocketIO = (server) => {
  const io = socket(server, {
    cors: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  io.on('connection', function (socket) {
    socket.emit('connected', 'connected');
    logger.debug(`[connection] ${httpResponses.SUCCESS}`);
    onTest(io, socket);
    onDisconnect(io, socket);
    onMessage(io, socket);
  });
  return io;
};

const onTest = (io, socket) => {
  return socket.on('test', function (data) {
    console.log(data);
    io.emit('return', data);
  });
};

const onDisconnect = (io, socket) => {
  return socket.on('disconnect', function (data) {
    logger.debug(`[disconnect] ${httpResponses.SUCCESS}`);
    socket.disconnect();
  });
};

const onMessage = (io, socket) => {
  return socket.on('messageBot', async (data) => {
    const dataObj = JSON.parse(data);

    console.log(dataObj);
    const value = await detectIntent('vi', dataObj.text, dataObj.context);
    io.emit(
      'returnBot',
      JSON.stringify({
        ...dataObj,
        value: value,
      })
    );
  });
};

module.exports = { createSocketIO };
