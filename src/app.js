// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
import express from "express"; // Importa a biblioteca Express para criar o servidor e gerenciar rotas
import * as dotenv from "dotenv"; // Importa a biblioteca dotenv para carregar variáveis de ambiente a partir do arquivo .env
import mongoose from "mongoose";
dotenv.config(); // Carrega variáveis de ambiente do arquivo .env para process.env

// Importa o controlador de usuários definido em um arquivo separado
import userController from "./controllers/userController.js";


// Chama a função express para criar uma aplicação Express
const app = express(); // Cria uma instância do aplicativo Express

// Configura o middleware para processar requisições JSON
app.use(express.json()); // Permite que o aplicativo receba e processe dados JSON no corpo das requisições
app.use(express.static("public")); // Serve arquivos estáticos da pasta "public" (por exemplo, HTML, CSS, JavaScript)
const MONGODB= process.env.URL_DO_BANCO

// Define a rota principal (home) que responde com uma mensagem de boas-vindas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



// Usa o controlador de usuários para gerenciar rotas que começam com "/user"
app.use("/user", userController); // Redireciona requisições para "/user" para o controlador de usuários




// Define a porta para o servidor a partir das variáveis de ambiente
const PORT = process.env.PORT; // Obtém a porta do arquivo .env
const ALTERNATE_PORT = process.env.ALTERNATE_PORT; // Obtém a porta alternativa do arquivo .env

// Inicia o servidor na porta especificada
const server = app.listen(PORT, () => {
  // Exibe uma mensagem no console quando o servidor começa a escutar na porta especificada
  console.log(`Servidor rodando em localhost:${PORT}`);
});

// Captura o erro de EADDRINUSE (porta já em uso) para tentar iniciar na porta alternativa
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') { // Verifica se o erro é devido à porta já estar em uso
    console.log(`Porta ${PORT} já está em uso. Tentando na porta alternativa ${ALTERNATE_PORT}...`);
    
    // Tenta iniciar o servidor na porta alternativa
    app.listen(ALTERNATE_PORT, () => {
      // Exibe uma mensagem no console quando o servidor começa a escutar na porta alternativa
      console.log(`Servidor rodando em localhost:${ALTERNATE_PORT}`);
    });
  } else {
    // Lida com outros erros que não são relacionados à porta já em uso
    console.error('Erro ao iniciar o servidor:', err);
  }
});

// Exporta o aplicativo e o servidor para que possam ser usados em outros módulos
export { app, server };