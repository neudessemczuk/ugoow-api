// Incluir as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outra funcionalidades
const express = require('express');
// Chamar a função express
const app = express();

import usersController from "./controllers/usersController"






// // Criar o middleware para receber os dados no corpo da requisição
// app.use(express.json());

// Criar a rota listar
// Endereço para acessar a api através de aplicação externa: http://localhost:8080







app.get("/", (req, res) => {

    // Retornar texto como resposta
    res.send("Bem-vindo a nossa API.");
});







// Criar a rota visualizar
// Endereço para acessar a api através de aplicação externa: http://localhost:8080/users/7?sit=2


app.use("/neudes/users", usersController);

app.post("/users", (req, res) => {

    // Receber os dados enviados no corpo da requisição
    var { name, email } = req.body;

    // Implementar a regra para salvar no banco de dados

    // Retornar objeto como resposta
    return res.json({
        name: name,
        email: email
    });
});


// Iniciar o servidor na porta 8080, criar a função utilizando modelo Arrow function para retornar a mensagem de sucesso
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});

//Código com Função Tradicional (antes do ES6)
// app.listen(8080, function() {
//     console.log("Servidor iniciado na porta 8080: http://localhost:8080");
// });


//dados para a requisição

// Criar a rota cadastrar
// Endereço para acessar a api através de aplicação externa: http://localhost:8080/users
// A aplicação externa deve indicar que está enviado os dados em formato de objeto: Content-Type: application/json
// Dados em formato de objeto
/*
{
    "name": "Neudes",
    "email": "neudes@neudes.com.br",
    "subject": "Assunto",
    "content": "Conteúdo"
}
*/