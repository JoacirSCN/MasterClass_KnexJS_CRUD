const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");
const e = require("express");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 8);

    // Selecionar todos os usuarios onde o email é igual ao email do request.body
    const checkUserExists = await knex('users').select('email');

    const emailExists = checkUserExists.filter(checkUserExist => {
      if(checkUserExist.email === email){
        throw new AppError('Este e-mail já está em uso.');;
      }
    });

   


    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ name, email, password });
  }
}

module.exports = UsersController;
