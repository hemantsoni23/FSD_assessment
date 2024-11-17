const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();

dotenv.config();

// Connect to the database
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Allow access from any subdomain ending with .vercel.app
const allowedOriginPattern = /^https:\/\/.*\.vercel.app$/;

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from your front-end domain or no origin (for testing)
    if (allowedOriginPattern.test(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Make sure credentials are allowed
};

// Use CORS middleware with the configured options
app.use(cors(corsOptions));

// Placeholder route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Routes
app.use('/api/user', require('./routes/usersRoutes'));
app.use('/api/data', require('./routes/dataRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
