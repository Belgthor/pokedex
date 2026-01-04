require('dotenv').config();
const express = require('express')
const cors = require('cors')
const http = require('http')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
var jwt = require("jsonwebtoken");
const view = __dirname + '/view/browser/'
const mongoDB = process.env.MONGO_URI || 'mongodb://localhost:27017/pokedex';
const PORT = process.env.PORT || 5000;
const app = express()
const server = http.createServer(app);
const pokemonRoute = require('./pokemon/pokemonRoute')
const trainerRoute = require('./trainer/trainerRoute')
const authRoute = require('./auth/authRoute')
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: ["https://pokedex.netfamily.ca","http://localhost:4200"],
    credentials: true
  }
})
app.use(express.static(view))
app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: ['https://pokedex.netfamily.ca','http://localhost:4200'],
  optionsSuccessStatus: 200
}))

app.use('/api', pokemonRoute)
app.use('/api', trainerRoute)
app.use('/api', authRoute)
main().catch((err) => console.log(err));
async function main() {
  try {
    await mongoose.connect(mongoDB, { autoIndex: false });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error', err);
    // Optionally retry or exit
    process.exit(1);
  }
}
main();
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('message', (msg) => {
    console.log('Received message:', msg)
    io.emit('message', msg)
  })
  socket.on('updatePokemon', (msg) => {
    console.log('Received Update:', msg)
    io.emit('updatePokemon', msg)
  })
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});