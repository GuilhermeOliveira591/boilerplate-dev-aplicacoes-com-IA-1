const enrollmentService = require('../services/EnrollmentService');

class EnrollmentController {
    async create(req, res) {
        try {
            const enrollment = await enrollmentService.enroll(req.body);
            res.status(201).json({ message: 'Matrícula realizada com sucesso!', ...enrollment });
        } catch (error) {
            const status = error.message.includes('não encontrado') ? 404 : 400;
            res.status(status).json({ error: error.message });
        }
    }
}

module.exports = new EnrollmentController();
