const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
server.listen(3000);

const socketio = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const currentIdInfo = {
  id: '',
  atqa: '',
  sak: '',
  ats: '',
};

const defaults = {
  atqa: '00 00',
  sak: '00',
  ats: '00 00 00 00',
};

require('./routes')(app, currentIdInfo);

socketio.on('connection', function(socket) {
  socket.emit('message', {msg: `Hello ${socket.id}`});
  socket.on('message', function(data) {
    console.log(data);
    socket.emit('message', {msg: 'another hello'});
  });
});
