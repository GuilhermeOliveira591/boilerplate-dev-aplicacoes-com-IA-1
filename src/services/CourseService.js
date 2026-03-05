const courseRepository = require('../repositories/CourseRepository');

class CourseService {
    async createCourse(data) {
        const { title, price } = data;

        if (!title || title.length < 5) {
            throw new Error('Título deve ter pelo menos 5 caracteres.');
        }

        if (price < 0) {
            throw new Error('Preço não pode ser negativo.');
        }

        return await courseRepository.create(title, price);
    }
}

module.exports = new CourseService();
