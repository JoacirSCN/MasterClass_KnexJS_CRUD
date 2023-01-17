const { Router } = require("express");

const TagsController = require('../controllers/TagsController')
const tagsController = new TagsController();

const tagsRoutes = Router();

// Eu quero executar usersController.create na raiz
tagsRoutes.get('/:user_id', tagsController.index);


module.exports = tagsRoutes;