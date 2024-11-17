const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();

dotenv.config()

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const allowedOrigins = [
  'https://assessment-hemant-soni.vercel.app',
  'https://fsd-assessment-hemant-soni.vercel.app',
  process.env.FRONTEND_URL,
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
};

app.use(cors(corsOptions));

// Enable preflight requests globally
app.options('*', cors(corsOptions));


// Placeholder route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// connect to the database
connectDB();

//routes
app.use('/api/user',require("./routes/usersRoutes"));
app.use('/api/data', require("./routes/dataRoutes"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
