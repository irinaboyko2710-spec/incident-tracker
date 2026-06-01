const express = require('express');
const cors = require('cors'); 
const incidentRoutes = require('./routes/incidents.routes');
const userRoutes = require('./routes/users.routes');
const logger = require('./middleware/request-logging');
const errorHandler = require('./middleware/error-handler');
const { initDb } = require('./db/initDb');
const app = express();
const PORT = 3000;
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization']
})); 
app.use(express.json()); 
app.use(logger);        
app.use('/api/v1/incidents', incidentRoutes);
app.use('/api/v1/users', userRoutes);
app.use(errorHandler); 
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Сервер запущено на порту ${PORT}`);
    });
}).catch(err => {
    console.error('Помилка бази даних при старті!', err);
});