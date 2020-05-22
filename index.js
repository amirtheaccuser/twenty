const mongoose = require('mongoose');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Express Session
app.use('/', require('./routes/api/auth'));
app.use('/', require('./routes/api/users'));
app.use('/', require('./routes/api/register'));
app.use('/', require('./routes/api/login'));

const PORT = 9000;

const DB = require('./config/db_key').DB_KEY;

start_app = async () => {
  try {
    await mongoose.connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    server.listen(PORT, console.log('Server started, DB connected'));
  } catch (error) {
    console.log(error);
  }
};

start_app();

io.on('connection', (socket) => {
  console.log('New WS connection');
});
