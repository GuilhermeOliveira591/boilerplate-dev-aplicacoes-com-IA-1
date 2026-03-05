const userRepository = require('../repositories/UserRepository');

class UserService {
    async createUser(data) {
        const { name, email, age } = data;

        if (!name || !email) {
            throw new Error('Nome e email são obrigatórios.');
        }

        if (age < 18) {
            throw new Error('Usuário deve ser maior de idade.');
        }

        return await userRepository.create(name, email, age);
    }

    async getAllUsers() {
        return await userRepository.findAll();
    }

    async updateUser(id, data) {
        const { name, email, age } = data;

        if (!email.includes('@')) {
            throw new Error('Email inválido.');
        }

        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        return await userRepository.update(id, name, email, age);
    }
}

module.exports = new UserService();
