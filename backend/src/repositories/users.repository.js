const { db } = require('../db/db');
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
            const sql = `SELECT * FROM users WHERE id = ?`;
            db.get(sql, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    create(data) {
        return new Promise((resolve, reject) => {
            const { username, full_name } = data;
            const sql = `INSERT INTO users (username, full_name) VALUES (?, ?)`;
            
            db.run(sql, [username, full_name], function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, ...data });
            });
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM users WHERE id = ?`;
            db.run(sql, [id], function(err) {
                if (err) reject(err);
                else resolve({ deleted: this.changes });
            });
        });
    }
}
module.exports = new UserRepository();