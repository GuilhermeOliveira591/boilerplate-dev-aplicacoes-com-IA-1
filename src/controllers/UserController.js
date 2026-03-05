const userService = require('../services/UserService');

class UserController {
    async create(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários.' });
        }
    }

    async update(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.json(user);
        } catch (error) {
            const status = error.message === 'Usuário não encontrado.' ? 404 : 400;
            res.status(status).json({ error: error.message });
        }
    }
}

module.exports = new UserController();
