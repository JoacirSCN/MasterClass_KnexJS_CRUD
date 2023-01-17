const { Router } = require("express");

const NotesController = require('../controllers/NotesController')
const notesController = new NotesController();

const notesRoutes = Router();

// Eu quero executar usersController.create na raiz
notesRoutes.get('/', notesController.index);
notesRoutes.post('/:user_id', notesController.create);
notesRoutes.get('/:id', notesController.show);
notesRoutes.delete('/:id', notesController.delete);


module.exports = notesRoutes;