const config = require('../../../knexfile');
const knexfile = require('knex');

const connection = knex(config.development);

module.exports = connection;