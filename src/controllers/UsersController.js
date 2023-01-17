const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 8);

    // Selecionar todos os usuarios onde o email é igual ao email do request.body
    const checkEmailExists = await knex('users').select('*');
  
    checkEmailExists.filter(checkEmailExist => {
      if(checkEmailExist.email === email){
        throw new AppError('Este e-mail já está em uso.');;
      }
    });

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const { id } = req.params;
    
    const users = await knex('users').select('*').where({ id });
    const user = users.pop();
    console.log(user)

    if(!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const userEmail  = await knex('users').select('*').where({ email })
    const userWithUpdatedEmail = userEmail.pop();

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este e-mail já está em uso.');
    }
    
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password) {
      throw new AppError('Você precisa informar a senha antiga para definir a nova senha!')
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        throw new AppError('A senha antiga não confere.');
      }

      user.password = await hash(password, 8);
    }

    await knex("users").where({id}).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: new Date()
    })

    res.status(201).json();
  }
}

module.exports = UsersController;
