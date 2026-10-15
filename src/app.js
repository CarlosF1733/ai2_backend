const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const User = require('./User');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota 1: Listar utilizadores (READ)
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Rota 2: Registar novo utilizador (CREATE)
app.post('/users', async (req, res) => {
  try {
    const { nome, apelido, cidade, funcao, mail, pass } = req.body;
    const novoUser = await User.create({
      nome,
      apelido,
      cidade,
      funcao,
      mail,
      pass
    });
    res.status(201).json({ success: true, data: novoUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Sincronizar com o Render e arrancar o servidor
sequelize.sync({ alter: true }).then(() => {
  console.log('Tabela sincronizada sem timestamps no PostgreSQL!');
  app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro na ligação à BD:', err);
});