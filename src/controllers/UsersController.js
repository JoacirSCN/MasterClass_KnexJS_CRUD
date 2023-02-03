const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 8);

    // Selecionar todos os usuarios onde o email é igual ao email do request.body
    const checkEmailExists = await knex('users').select('*').where({email});
  
    if(checkEmailExists.length > 0){
      throw new AppError('Este e-mail já está em uso.');;
    }

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;
    
    const users = await knex('users').select('*').where('id', user_id);
    const user = users.pop();

    if(user.length === 0) {
      throw new AppError('Usuário não encontrado.');
    }

    const userWithUpdatedEmail  = await knex('users').select('*').where({ email })

    if(userWithUpdatedEmail[0] && userWithUpdatedEmail[0].id !== user[0].id) {
      throw new AppError('Este e-mail já está em uso.');
    }
    
    user[0].name = name ?? user[0].name;
    user[0].email = email ?? user[0].email;

    if(password && !old_password) {
      throw new AppError('Você precisa informar a senha antiga para definir a nova senha!')
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        throw new AppError('A senha antiga não confere.');
      }

      user[0].password = await hash(password, 8);
    }

    await knex("users").where('id', user_id).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: new Date()
    })

    return res.status(201).json();
  }
}

module.exports = UsersController;
