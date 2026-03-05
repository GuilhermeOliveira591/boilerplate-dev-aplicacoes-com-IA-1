const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());

// Banco de dados em memória para facilitar a execução
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    // Criação das tabelas
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, age INTEGER)");
    db.run("CREATE TABLE courses (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, price REAL)");
    db.run("CREATE TABLE enrollments (user_id INTEGER, course_id INTEGER, PRIMARY KEY(user_id, course_id))");

    // Seeds iniciais
    db.run("INSERT INTO users (name, email, age) VALUES ('Carlos', 'carlos@email.com', 30)");
    db.run("INSERT INTO courses (title, price) VALUES ('Desenvolvimento de aplicações com IA', 997.00)");
});

// --- ENDPOINTS DE USUÁRIOS ---

app.post('/api/users', (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
    }
    if (age < 18) {
        return res.status(400).json({ error: 'Usuário deve ser maior de idade.' });
    }

    const stmt = db.prepare("INSERT INTO users (name, email, age) VALUES (?, ?, ?)");
    stmt.run([name, email, age], function(err) {
        if (err) return res.status(500).json({ error: 'Erro ao salvar no banco.' });
        res.status(201).json({ id: this.lastID, name, email, age });
    });
    stmt.finalize();
});

app.get('/api/users', (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar usuários.' });
        res.json(rows);
    });
});

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Email inválido.' });
    }

    db.get("SELECT id FROM users WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: 'Erro no banco de dados.' });
        if (!row) return res.status(404).json({ error: 'Usuário não encontrado.' });

        db.run(
            "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?",
            [name, email, age, id],
            function(err) {
                if (err) return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
                res.json({ id, name, email, age });
            }
        );
    });
});

// --- ENDPOINTS DE CURSOS ---

app.post('/api/courses', (req, res) => {
    const { title, price } = req.body;

    if (!title || title.length < 5) {
        return res.status(400).json({ error: 'Título deve ter pelo menos 5 caracteres.' });
    }
    if (price < 0) {
        return res.status(400).json({ error: 'Preço não pode ser negativo.' });
    }

    db.run("INSERT INTO courses (title, price) VALUES (?, ?)", [title, price], function(err) {
        if (err) return res.status(500).json({ error: 'Erro ao criar curso.' });
        res.status(201).json({ id: this.lastID, title, price });
    });
});

// --- ENDPOINTS DE MATRÍCULAS ---

app.post('/api/enrollments', (req, res) => {
    const { user_id, course_id } = req.body;

    if (!user_id || !course_id) {
        return res.status(400).json({ error: 'user_id e course_id são obrigatórios.' });
    }

    // Callback Hell: Validações de negócio e banco de dados altamente acopladas
    db.get("SELECT id FROM users WHERE id = ?", [user_id], (err, user) => {
        if (err) return res.status(500).json({ error: 'Erro ao validar usuário.' });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

        db.get("SELECT id FROM courses WHERE id = ?", [course_id], (err, course) => {
            if (err) return res.status(500).json({ error: 'Erro ao validar curso.' });
            if (!course) return res.status(404).json({ error: 'Curso não encontrado.' });

            db.get("SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?", [user_id, course_id], (err, enrollment) => {
                if (err) return res.status(500).json({ error: 'Erro ao verificar matrícula.' });
                if (enrollment) return res.status(400).json({ error: 'Usuário já matriculado neste curso.' });

                db.run("INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)", [user_id, course_id], function(err) {
                    if (err) return res.status(500).json({ error: 'Erro ao matricular usuário.' });
                    res.status(201).json({ message: 'Matrícula realizada com sucesso!', user_id, course_id });
                });
            });
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API espaguete rodando na porta ${PORT}`);
});