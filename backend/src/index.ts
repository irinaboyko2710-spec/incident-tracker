import express from 'express';
import cors from 'cors'; 
import rateLimit from 'express-rate-limit'; 
import incidentRoutes from './routes/incidents.routes.js';
import userRoutes from './routes/users.routes.js';
import logger from './middleware/request-logging.js';
import errorHandler from './middleware/error-handler.js';
import { initDb } from './db/initDb.js';

const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100 
});
app.use(limiter);
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});
app.use(cors({
    origin: 'http://127.0.0.1:5500', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
})); 
app.use(express.json()); 
app.use(logger);       
app.use('/api/v1/incidents', incidentRoutes);
app.use('/api/v1/users', userRoutes);
app.use(errorHandler); 
const PORT = 3000;
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`\nСервер запущено на порту ${PORT}`);
        console.log(`API v1 готове: http://localhost:${PORT}/api/v1/users`);
    });
}).catch(err => {
    console.error('Помилка бази даних!', err);
});