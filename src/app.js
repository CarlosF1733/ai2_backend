const express = require('express');
const cors = require('cors');
const sequelize = require('./model/database');
const userRoutes = require('./routes/userRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas principais
app.use('/users', userRoutes);

// Redirecionar raiz para a lista
app.get('/', (req, res) => {
  res.redirect('/users/list');
});

// Sincronização da Base de Dados e arranque do servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao ligar à BD:', err);
});