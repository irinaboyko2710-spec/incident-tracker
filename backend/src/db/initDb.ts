import db from './db';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const initDb = async (): Promise<void> => {
    const schemaPath = path.resolve(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    return new Promise((resolve, reject) => {
        db.exec(schema, (err) => {
            if (err) {
                reject(err);
            } else {
                const insertAdmin = `INSERT OR IGNORE INTO users (id, username, full_name) VALUES (1, 'admin', 'Головний Адміністратор');`;
                db.run(insertAdmin, (runErr) => {
                    if (runErr) {
                        console.error('Помилка створення адміна:', runErr);
                        resolve(); 
                    } else {
                        const insertIryna = `INSERT OR IGNORE INTO users (id, username, full_name) VALUES (2, 'Iryna', 'Ірина Бойко');`;
                        db.run(insertIryna, (irynaErr) => {
                            if (irynaErr) {
                                console.error('Помилка створення користувача Ірина:', irynaErr);
                            } else {
                                console.log('Таблиці ініціалізовані, користувачі готові.');
                            }
                            resolve();
                        });
                    }
                });
            }
        });
    });
};
export { initDb };