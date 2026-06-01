const express = require('express');
const incidentRoutes = require('./routes/incidents.routes');
const userRoutes = require('./routes/users.routes');
const logger = require('./middleware/request-logging');
const errorHandler = require('./middleware/error-handler');
const app = express();
app.use(express.json()); 
app.use(logger);       
app.use('/api/incidents', incidentRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler); 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(``);
    console.log(`Сервер Lab0.2.0 запущено успішно!`);
    console.log(`Тестувати тут: http://localhost:${PORT}/api/incidents`);
    console.log(``);
});