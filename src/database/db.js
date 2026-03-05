const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const get = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const run = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, changes: this.changes });
        });
    });
};

const initDb = async () => {
    await run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, age INTEGER)");
    await run("CREATE TABLE courses (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, price REAL)");
    await run("CREATE TABLE enrollments (user_id INTEGER, course_id INTEGER, PRIMARY KEY(user_id, course_id))");

    // Seeds
    await run("INSERT INTO users (name, email, age) VALUES ('Carlos', 'carlos@email.com', 30)");
    await run("INSERT INTO courses (title, price) VALUES ('Desenvolvimento de aplicações com IA', 997.00)");
};

module.exports = {
    db,
    query,
    get,
    run,
    initDb
};
