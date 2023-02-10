const knex = require("../database/knex");

class UserRepository {
  async findByEmail(email) {
    const user = await knex('users').select('*').where({ email });

    return user;
  }

  async create({name, email, password}) {
    const userId = await knex("users").insert({
      name,
      email,
      password: password,
    });

    return { id: userId };
  }
}

module.exports = UserRepository;
