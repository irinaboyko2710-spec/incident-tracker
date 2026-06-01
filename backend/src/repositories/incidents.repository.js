const db = require('../db/db');
class IncidentRepository {
    findAll() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM incidents WHERE severity != '' ORDER BY id DESC LIMIT 5";
            // Прибрали []
            db.all(sql, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            // Прибрали []
            db.get(`SELECT * FROM incidents WHERE id = ${id}`, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }
    create(data) {
        return new Promise((resolve, reject) => {
            const { tag, severity, comments, user_id } = data;
            const sql = `INSERT INTO incidents (tag, severity, comments, user_id) 
                         VALUES ('${tag}', '${severity}', '${comments}', ${user_id})`;
            db.run(sql, function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, ...data });
            });
        });
    }
    update(id, data) {
        return new Promise((resolve, reject) => {
            const { tag, severity, comments } = data;
            const sql = `UPDATE incidents 
                         SET tag = '${tag}', severity = '${severity}', comments = '${comments}' 
                         WHERE id = ${id}`;
            db.run(sql, function(err) {
                if (err) reject(err);
                else resolve(this.changes > 0);
            });
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM incidents WHERE id = ${id}`, function(err) {
                if (err) reject(err);
                else resolve(this.changes > 0);
            });
        });
    }
}
module.exports = new IncidentRepository();