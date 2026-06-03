import db from '../db/db';
class UserRepository {
    async findAll(limit: any = 10, sort: any = 'username', order: any = 'ASC'): Promise<any> {
        const sql = `SELECT * FROM users WHERE 1=1 ORDER BY ${sort} ${order} LIMIT ${limit}`;
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
    async findById(id: any): Promise<any> {
        const sql = `SELECT * FROM users WHERE id = ?`;
        
        return new Promise((resolve, reject) => {
           db.get(sql, [id], (err, row) => { 
            if (err) reject(err);
            else resolve(row);
            });
        });
    }
    async create(user: any): Promise<any> {
        const sql = `INSERT INTO users (username, full_name) VALUES ('${user.username}', '${user.full_name}')`;
        return new Promise((resolve, reject) => {
            db.run(sql, function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, username: user.username, full_name: user.full_name });
            });
        });
    }
}
export default new UserRepository();