import db from '../db/db';
class IncidentRepository {
    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM incidents ORDER BY id DESC LIMIT 10";
            db.all(sql, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const { date, tag, severity, comments, user_id, user_name } = data;
            const sql = `INSERT INTO incidents (date, tag, severity, comments, user_id, user_name) VALUES (?, ?, ?, ?, ?, ?)`;
            const params = [date, tag, severity, comments, user_id, user_name || 'Не вказано'];
            db.run(sql, params, function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, ...data });
            });
        });
    }
    findById(id: number, userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM incidents WHERE id = ?`, [id], (err, row) => {
            if (err) return reject(err);
            if (!row) return reject({ status: 404, message: "Не знайдено" });
            if ((row as any).user_id !== userId) {
                return reject({ status: 403, message: "Доступ заборонено: Ви не є власником цієї заявки" });
            }
            
            resolve(row);
        });
    });
}
    
    update(id: number, userId: number, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const { tag, severity, comments } = data;
            db.run(`UPDATE incidents SET tag=?, severity=?, comments=? WHERE id=? AND user_id=?`, 
                   [tag, severity, comments, id, userId], function(err) {
                if (err) reject(err);
                else resolve(this.changes > 0);
            });
        });
    }

    delete(id: number, userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM incidents WHERE id = ? AND user_id = ?`, [id, userId], function(err) {
                if (err) reject(err);
                else resolve(this.changes > 0);
            });
        });
    }
}
export default new IncidentRepository();