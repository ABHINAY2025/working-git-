import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';

 // To parse JSON bodies
// Load environment variables
config();

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(json());
app.use(cors());

// Import routes
import studentRoutes from './routes/student.js';

// Use routes
app.use('/api/student', studentRoutes);

// Import request routes
import requestRoutes from './routes/request.js';

// Use request routes
app.use('/api/request', requestRoutes);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
