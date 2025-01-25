import express from "express";
import cors from "cors";
import conectarBancoDados from "./config/bancoDados.js";
import rotasUsuario from "./controllers/ControladorUsuario.js";

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o banco de dados
conectarBancoDados();

// Rotas
app.use("/api/usuario", rotasUsuario);

// Porta do servidor
const PORTA = process.env.PORTA || 5000;
// Inicialização do servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
