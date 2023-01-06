// Importa o express
const express = require('express');
// Inicia o express
const app = express();
// Numéro da porta que nossa API vai fica observando
const PORT = 3333;
// Fique observando na PORT quando a aplicação iniciar o console.log
// sera executado no terminal

const {sqliteConnection, knex} = require('./database/sqlite');
sqliteConnection();

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
})
