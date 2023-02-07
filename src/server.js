require('express-async-errors')
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");
const sqliteConnection = require('./database/sqlite');

const cors = require('cors');
const express = require('express');
const routes = require('./routes');

sqliteConnection();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

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
  console.log(error)
	// SERVIDOR
  return res.status(500).json({
    status: "error",
    message: `Interval server error ${error}`,
  });
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
})