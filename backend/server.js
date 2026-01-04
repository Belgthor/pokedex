const express = require('express')
const cors = require('cors')
const http = require('http')
const mongoose = require('mongoose')
var jwt = require("jsonwebtoken");
const view = __dirname + '/view/browser/'
const mongoDB = "mongodb://homelab:Genesis1979@192.168.8.111:27017/pokedex?authSource=admin"
const app = express()
const server = http.createServer(app);
const postsRoute = require('./posts/postsRoute')
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
app.use(cors({
  origin: ['https://pokedex.netfamily.ca','http://localhost:4200'],
  optionsSuccessStatus: 200
}))

app.use('/api', postsRoute)
app.use('/api', pokemonRoute)
app.use('/api', trainerRoute)
app.use('/api', authRoute)
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB)
}
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
server.listen(5000, () => {
    console.log('Server running on 5000')
})