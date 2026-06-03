import db from './db';

const dbClient = {
    all: (sql: string, params: any[] = []): Promise<any[]> => new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
    }),
    get: (sql: string, params: any[] = []): Promise<any> => new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)));
    }),
    run: (sql: string, params: any[] = []): Promise<any> => new Promise((resolve, reject) => {
        db.run(sql, params, function(this: any, err) { (err ? reject(err) : resolve(this)); });
    })
};
export default dbClient;