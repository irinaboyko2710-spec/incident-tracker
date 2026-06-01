const db = require('../db/db');
class UserRepository {
    findAll() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM users", [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE id = ${id}`;
            db.get(sql, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }
    create(data) {
        return new Promise((resolve, reject) => {
            const { username, full_name } = data;
            // Просто вставляємо змінні в рядок через шаблони ``
            const sql = `INSERT INTO users (username, full_name) 
                         VALUES ('${username}', '${full_name}')`;
            
            db.run(sql, function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, ...data });
            });
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM users WHERE id = ${id}`;
            db.run(sql, function(err) {
                if (err) reject(err);
                else resolve({ deleted: this.changes });
            });
        });
    }
}
module.exports = new UserRepository();