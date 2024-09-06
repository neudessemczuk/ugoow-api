// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
import express from "express";
import * as dotenv from "dotenv";
dotenv.config();


import userController from "./controllers/userController.js";


// Chamar a função express
const app = express();

// Criar o middleware para receber os dados no corpo da requisição
app.use(express.json());
app.use(express.static("public"));



// Criar a rota listar
// Endereço para acessar a api através de aplicação externa: http://localhost:8080
app.get("/", (req, res) => {
    // Retornar texto como resposta
    res.send("Bem-vindo a nossa API.");
});




app.use("/user", userController);



// Iniciar o servidor na porta definida no arquivo.env, cria a função utilizando modelo Arrow function para retornar a mensagem de sucesso
const PORT = process.env.PORT;
const ALTERNATE_PORT = process.env.ALTERNATE_PORT;

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando em localhost:${PORT}`);
});

// Captura o erro de EADDRINUSE (porta já em uso)
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Porta ${PORT} já está em uso. Tentando na porta alternativa ${ALTERNATE_PORT}...`);
    
    // Tenta iniciar na porta alternativa
    app.listen(ALTERNATE_PORT, () => {
      console.log(`Servidor rodando em localhost:${ALTERNATE_PORT}`);
    });
  } else {
    // Lida com outros erros
    console.error('Erro ao iniciar o servidor:', err);
  }
});

export { app, server }; // Exporta io app para uso em outros módulos
