const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs'); 
const dataDirPath = path.resolve(__dirname, '../../data');
if (!fs.existsSync(dataDirPath)) {
    fs.mkdirSync(dataDirPath, { recursive: true });
}
const dbPath = path.join(dataDirPath, 'app.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Помилка підключення до БД:', err.message);
    } else {
        console.log('Зв’язок із файлом бази встановлено.');
    }
});
db.run('PRAGMA foreign_keys = ON;');
module.exports = db;