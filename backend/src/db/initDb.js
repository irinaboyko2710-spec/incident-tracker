const db = require('./db');
const fs = require('fs');
const path = require('path');
const initDb = async () => {
    const schemaPath = path.resolve(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    return new Promise((resolve, reject) => {
        db.exec(schema, (err) => {
            if (err) {
                reject(err);
            } else {
                const insertUser = `INSERT OR IGNORE INTO users (id) VALUES (1);`;
                
                db.run(insertUser, (runErr) => {
                    if (runErr) console.error('Помилка створення користувача:', runErr);
                    else console.log('Таблиці ініціалізовані, користувач готовий.');
                    resolve();
                });
            }
        });
    });
};
module.exports = { initDb };