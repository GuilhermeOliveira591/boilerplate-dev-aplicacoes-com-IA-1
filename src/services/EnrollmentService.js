const enrollmentRepository = require('../repositories/EnrollmentRepository');
const userRepository = require('../repositories/UserRepository');
const courseRepository = require('../repositories/CourseRepository');

class EnrollmentService {
    async enroll(data) {
        const { user_id, course_id } = data;

        if (!user_id || !course_id) {
            throw new Error('user_id e course_id são obrigatórios.');
        }

        const user = await userRepository.findById(user_id);
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        const course = await courseRepository.findById(course_id);
        if (!course) {
            throw new Error('Curso não encontrado.');
        }

        const existingEnrollment = await enrollmentRepository.find(user_id, course_id);
        if (existingEnrollment) {
            throw new Error('Usuário já matriculado neste curso.');
        }

        return await enrollmentRepository.create(user_id, course_id);
    }
}

module.exports = new EnrollmentService();
