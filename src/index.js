const express = require('express');
const { initDb } = require('./database/db');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();
app.use(express.json());

// Registro das Rotas
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

const PORT = 3000;

// Inicialização Assíncrona do Banco e Servidor
const start = async () => {
    try {
        await initDb();
        app.listen(PORT, () => {
            console.log(`API Refatorada rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Falha ao iniciar a aplicação:', error);
        process.exit(1);
    }
};

start();
