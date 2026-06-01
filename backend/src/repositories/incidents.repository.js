const {db} = require('../db/db');
class IncidentRepository {
    findAll() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM incidents ORDER BY id DESC LIMIT 10";
            db.all(sql, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
    create(data) {
        return new Promise((resolve, reject) => {
            const { date, tag, severity, comments, user_id, user_name } = data;
            const sql = `INSERT INTO incidents (date, tag, severity, comments, user_id, user_name) 
                         VALUES (?, ?, ?, ?, ?, ?)`;
            const params = [date, tag, severity, comments, user_id, user_name || 'Не вказано'];
            db.run(sql, params, function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, ...data });
            });
        });
    }
    update(id, data) {
        return new Promise((resolve, reject) => {
            const { tag, severity, comments } = data;
            db.run(`UPDATE incidents SET tag=?, severity=?, comments=? WHERE id=?`, 
                   [tag, severity, comments, id], function(err) {
                if (err) reject(err);
                else resolve(this.changes > 0);
            });
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM incidents WHERE id = ?`, [id], function(err) {
                if (err) reject(err);
                else resolve(this.changes > 0);
            });
        });
    }
}
module.exports = new IncidentRepository();