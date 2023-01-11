require('express-async-errors')
const AppError = require("./utils/AppError");

const sqliteConnection = require('./database/sqlite');
sqliteConnection();

const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

// As rotas estão aqui
app.use(routes);

// TRATAMENTO DE ERROS
app.use((error, req, res, next) => {
	// CLIENTE
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

	// SERVIDOR
  return res.status(500).json({
    status: "error",
    message: "Interval server error",
  });
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
})