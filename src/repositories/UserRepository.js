const db = require('../database/db');

class UserRepository {
    async create(name, email, age) {
        const result = await db.run("INSERT INTO users (name, email, age) VALUES (?, ?, ?)", [name, email, age]);
        return { id: result.id, name, email, age };
    }

    async findAll() {
        return await db.query("SELECT * FROM users");
    }

    async findById(id) {
        return await db.get("SELECT * FROM users WHERE id = ?", [id]);
    }

    async update(id, name, email, age) {
        await db.run("UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?", [name, email, age, id]);
        return { id, name, email, age };
    }
}

module.exports = new UserRepository();
