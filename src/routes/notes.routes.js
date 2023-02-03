const { Router } = require("express");

const NotesController = require('../controllers/NotesController')
const notesController = new NotesController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


const notesRoutes = Router();

notesRoutes.use(ensureAuthenticated)

// Eu quero executar usersController.create na raiz
notesRoutes.get('/', notesController.index);
notesRoutes.post('/', notesController.create);
notesRoutes.get('/:id', notesController.show);
notesRoutes.delete('/:id', notesController.delete);


module.exports = notesRoutes;