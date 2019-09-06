const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
  console.log(connectedUsers)
})

mongoose.connect('mongodb://omnistack:123#mudar@ds261277.mlab.com:61277/omnistack08', {
  useNewUrlParser: true
});

app.use((request, response, next) => {
  request.io = io;
  request.connectedUsers = connectedUsers;

  return next();
})

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);