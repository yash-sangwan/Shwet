const express = require("express");
const session = require('express-session');
const app = express();
const authRoutes = require('./routes/auth');
const proofRoutes = require('./routes/proof');
const { protect } = require('./controllers/authController');
const { callbackHandler } = require('./controllers/proofController');
const connectDB = require("./config/db");
const cors = require ("cors")

require('dotenv').config();
// Use CORS middleware
app.use(cors({
    origin: 'https://shwet.vercel.app', // Specify the allowed origin (frontend's URL)
    methods: 'GET,POST,PUT,DELETE,OPTIONS',  // Specify allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization',  // Specify allowed headers
}));

// Manually set headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://shwet.vercel.app');  // Manually set origin
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();  // Send OK for preflight requests
    }
    next();
});
// Handle preflight requests
app.options('*', cors());

// Connect MongoDB via mongoose
connectDB();

// EXPRESS CONFIGURATION
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// ENDPOINTS
app.use('/auth', authRoutes);
app.use('/proof', proofRoutes);
app.post('/callback/', callbackHandler)
app.get('/', (req, res) => {
    res.send('Welcome to the Solana DApp Backend');
});

module.exports = app;
