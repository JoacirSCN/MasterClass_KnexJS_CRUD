const { Router } = require("express");
const multer = require('multer');
const uploadConfigs = require('../configs/upload');

const UsersController = require('../controllers/UsersController')
const UserAvatarController = require('../controllers/UserAvatarController')

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const update = multer(uploadConfigs.MULTER);

// Eu quero executar usersController.create na raiz
usersRoutes.post('/', usersController.create);
usersRoutes.put('/', ensureAuthenticated, usersController.update);
usersRoutes.patch('/avatar', ensureAuthenticated, update.single('avatar'), userAvatarController.update)


module.exports = usersRoutes;