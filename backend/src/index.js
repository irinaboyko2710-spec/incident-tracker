const express = require('express');
const incidentRoutes = require('./routes/incidents.routes');
const userRoutes = require('./routes/users.routes');
const logger = require('./middleware/request-logging');
const errorHandler = require('./middleware/error-handler');
const { initDb } = require('./db/initDb');
const app = express();
app.use(express.json()); 
app.use(logger);       
app.use('/api/incidents', incidentRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler); 
const PORT = 3000;
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`\n`);
        console.log(`База даних готова до роботи.`);
        console.log(`Сервер Lab3 (SQLite) запущено успішно!`);
        console.log(`Тестувати тут: http://localhost:${PORT}/api/incidents`);
        console.log(`\n`);
    });
}).catch(err => {
    console.error('КРИТИЧНА ПОМИЛКА: Не вдалося ініціалізувати базу даних!', err);
});