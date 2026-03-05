const courseService = require('../services/CourseService');

class CourseController {
    async create(req, res) {
        try {
            const course = await courseService.createCourse(req.body);
            res.status(201).json(course);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new CourseController();
