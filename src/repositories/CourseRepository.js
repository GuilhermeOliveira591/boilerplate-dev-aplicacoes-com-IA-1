const db = require('../database/db');

class CourseRepository {
    async create(title, price) {
        const result = await db.run("INSERT INTO courses (title, price) VALUES (?, ?)", [title, price]);
        return { id: result.id, title, price };
    }

    async findById(id) {
        return await db.get("SELECT * FROM courses WHERE id = ?", [id]);
    }
}

module.exports = new CourseRepository();
