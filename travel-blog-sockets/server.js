const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// Import routes
const placeRoutes = require('./routes/placeRoutes');

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use('/places', placeRoutes);

// Make io available to routes/controllers
app.set('io', io);

// MongoDB connection — corrected DB name
mongoose.connect('mongodb://localhost:27017/travelBlogDB', {  // 🔥 MATCHES seed.js
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  server.listen(3000, () => console.log('Server running at http://localhost:3000'));
}).catch(err => console.error('MongoDB connection error:', err));

// Basic Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
