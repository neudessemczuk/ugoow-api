import express from 'express';
import cors from 'cors'; // Importar o cors
import conectarBancoDados from './config/bancoDados.js';
import rotasUsuario from './controllers/ControladorUsuario.js';

const app = express();
const PORTA = process.env.PORTA || 5000;

// Middleware para parse de JSON
app.use(express.json());

// Permitir requisições de qualquer origem
app.use(cors());

// Conexão com o banco de dados
conectarBancoDados();

// Rotas
app.use('/api/usuario', rotasUsuario);

// Inicialização do servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
