import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { Server as SocketIOServer, Socket } from 'socket.io';

// Route imports (TS will resolve .ts automatically)
import pokemonRoute from './pokemon/pokemonRoute';
import trainerRoute from './trainer/trainerRoute';
import authRoute from './auth/authRoute';

const view = __dirname + '/view/browser/';
const mongoDB: string = process.env.MONGO_URI || '';
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
if (!mongoDB) {
  console.error('FATAL: MONGO_URI is not set in environment variables.');
  process.exit(1);
}

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: ['https://pokedex.netfamily.ca', 'http://localhost:4200'],
    credentials: true
  }
});

// -----------------------------
// Global Middleware
// -----------------------------
app.use(express.static(view));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(
  cors({
    origin: ['https://pokedex.netfamily.ca', 'http://localhost:4200'],
    credentials: true,
    optionsSuccessStatus: 200
  })
);

// -----------------------------
// API Routes
// -----------------------------
app.use('/api', pokemonRoute);
app.use('/api', trainerRoute);
app.use('/api', authRoute);

// -----------------------------
// 404 Handler
// -----------------------------
app.use((_: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// -----------------------------
// MongoDB Connection
// -----------------------------
async function main(): Promise<void> {
  try {
    await mongoose.connect(mongoDB, { autoIndex: false });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1);
  }
}

main();

// -----------------------------
// Socket.IO Events
// -----------------------------
io.on('connection', (socket: Socket) => {
  console.log('A user connected:', socket.id);

  socket.on('message', (msg: unknown) => {
    console.log('Received message:', msg);
    io.emit('message', msg);
  });

  socket.on('updatePokemon', (msg: unknown) => {
    console.log('Received Update:', msg);
    io.emit('updatePokemon', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// -----------------------------
// Start Server
// -----------------------------
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});