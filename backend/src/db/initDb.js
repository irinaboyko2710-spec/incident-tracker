const fs = require('fs');
const path = require('path');
const { db } = require('./db');
function seedDatabase() {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) as count FROM users", [], (err, row) => {
      if (err) return reject(err);
      if (row && row.count === 0) {
        console.log("База порожня. Додаю користувачів...");
        const stmt = db.prepare("INSERT INTO users (id, username, full_name) VALUES (?, ?, ?)");
        stmt.run(101, 'iryna', 'Ірина Бойко');
        stmt.run(102, 'oleksiy', 'Олексій Петров');
        stmt.finalize();
      }
      db.get("SELECT COUNT(*) as count FROM incidents", [], (err, row) => {
        if (err) return reject(err);
        if (row && row.count === 0) {
          console.log("Додаю тестові інциденти для фронтенду...");
          const stmt = db.prepare(`
            INSERT INTO incidents (date, tag, severity, comments, user_id, user_name) 
            VALUES (?, ?, ?, ?, ?, ?)
          `);
          const now = new Date().toISOString();
          stmt.run(now, 'Помилка авторизації', 'high', 'Користувач не зміг увійти в систему', 101, 'Ірина Бойко');
          stmt.run(now, 'Повільний відгук API', 'medium', 'Запити до сервера займають більше 5 секунд', 102, 'Олексій Петров');

          stmt.finalize((err) => {
            if (err) return reject(err);
            console.log("Тестові дані успішно додані.");
            resolve();
          });
        } else {
          resolve();
        }
      });
    });
  });
}
function initDb() {
  return new Promise((resolve, reject) => {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schema, async (err) => {
      if (err) {
        console.error("Помилка ініціалізації БД:", err.message);
        return reject(err);
      }
      console.log("Таблиці успішно створені або вже існують.");
      try {
        await seedDatabase();
        resolve();
      } catch (seedErr) {
        console.error("Помилка при заповненні даними:", seedErr.message);
        reject(seedErr);
      }
    });
  });
}
module.exports = { initDb };