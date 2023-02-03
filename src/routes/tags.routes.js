const { Router } = require("express");

const TagsController = require('../controllers/TagsController')
const tagsController = new TagsController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tagsRoutes = Router();

// Eu quero executar usersController.create na raiz
tagsRoutes.get('/', ensureAuthenticated, tagsController.index);


module.exports = tagsRoutes;