const { Router } = require("express");

const UsersController = require('../controllers/UsersController')
const usersController = new UsersController();

const usersRoutes = Router();

// Eu quero executar usersController.create na raiz
usersRoutes.post('/', usersController.create);

module.exports = usersRoutes;