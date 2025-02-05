const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/news", require("./src/routes/newsRoutes"));

app.get("/", (req, res) => {
  res.send("API FIAP News funcionando!");
});

// ✅ Só conecta ao MongoDB se os testes NÃO estiverem rodando
if (process.env.NODE_ENV !== "test") {
  connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
