const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 1. Listar todos
router.get('/list', userController.list);

// 2. Criar novo utilizador
router.post('/create', userController.create);

// 3. Obter um único utilizador por ID
router.get('/get/:id', userController.get);

// 4. Atualizar utilizador por ID
router.put('/update/:id', userController.update);

// 5. Apagar utilizador por ID
router.delete('/delete/:id', userController.delete);

module.exports = router;