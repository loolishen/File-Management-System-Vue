const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const fileRoutes = require('./routers/fileroutes');

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // Include credentials like cookies in requests if needed
  }));

app.use(bodyParser.json()); 
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route definitions
app.use('/api', fileRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/filemanagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Failed to connect to MongoDB', err);
});

// Start the server
const PORT_NUMBER = 8081;
app.listen(PORT_NUMBER, () => {
  console.log(`Listening on port ${PORT_NUMBER}`);
});
