const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Define allowed origin pattern for subdomains
const allowedOriginPattern = /^https:\/\/.*\.assessment-hemant-soni\.vercel\.app$/;

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOriginPattern.test(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests globally
app.options('*', cors(corsOptions));

// Placeholder route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Connect to the database
connectDB();

// Routes
app.use('/api/user', require('./routes/usersRoutes'));
app.use('/api/data', require('./routes/dataRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
