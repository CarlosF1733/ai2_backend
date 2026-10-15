const User = require('../model/User');
const controllers = {};

// 1. Listar todos (READ ALL)
controllers.list = async (req, res) => {
  try {
    const data = await User.findAll();
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Registar novo utilizador (CREATE)
controllers.create = async (req, res) => {
  try {
    const { nome, apelido, cidade, funcao, mail, pass } = req.body;
    const data = await User.create({
      nome,
      apelido,
      cidade,
      funcao,
      mail,
      pass
    });
    res.status(201).json({ success: true, message: 'Registado', data: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 3. Obter um único utilizador por ID (READ ONE)
controllers.get = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByPk(id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Utilizador não encontrado' });
    }
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Atualizar utilizador por ID (UPDATE)
controllers.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, apelido, cidade, funcao, mail, pass } = req.body;
    const data = await User.update(
      { nome, apelido, cidade, funcao, mail, pass },
      { where: { id: id } }
    );
    res.json({ success: true, message: 'Atualizado com sucesso', data: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 5. Apagar utilizador por ID (DELETE)
controllers.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await User.destroy({ where: { id: id } });
    res.json({ success: true, message: 'Apagado com sucesso', deleted: del });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = controllers;