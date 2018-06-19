const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fetch = require('node-fetch');

const users = {};

io.on('connection', socket => {
  users[socket.handshake.query.userId] = socket;

  socket.on('userNameSet', payload => {
    users[payload.userId].userName = payload.msg;
    users[payload.userId].emit('messageDown', {
      user: 'system',
      msg: `Welcome to CatChat, ${users[payload.userId].userName}!`
    });
  });

  socket.on('getCatFact', payload => {
    getCatFact()
    .then(fact => {
      const message = {
        msg: fact.fact,
        user: 'CatFact!'
      };
      users[payload.userId].emit('messageDown', message);
    });
  });

  socket.on('messageUp', message => {
    io.emit('messageDown', {
      msg: message.msg,
      user: users[message.userId].userName
    });
  });
});

async function getCatFact() {
  try {
    const response = await fetch('https://catfact.ninja/fact');
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (error) {
    return error;
  }
}

server.listen(3000);

module.exports = app;
