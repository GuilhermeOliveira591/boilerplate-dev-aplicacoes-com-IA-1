const db = require('../database/db');

class EnrollmentRepository {
    async find(userId, courseId) {
        return await db.get("SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?", [userId, courseId]);
    }

    async create(userId, courseId) {
        await db.run("INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)", [userId, courseId]);
        return { user_id: userId, course_id: courseId };
    }
}

module.exports = new EnrollmentRepository();
