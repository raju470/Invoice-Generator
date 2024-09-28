import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { config } from './config/config.js';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';

const app = express();

connectDB();

const corsOptions = {
    origin: 'https://task-management-six-xi.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ extended: false }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
