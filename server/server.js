import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware,requireAuth } from '@clerk/express'
import sql from './configs/db.js';
import aiRouter from './routes/aiRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

// Test database connection
 

app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});



app.use('/api/ai', aiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});