// Importa a função Router da biblioteca express, que é usada para criar rotas no Express.
import { Router } from "express";

// Importa as funções listUsers, createUser, updateUser e deleteUser do módulo userService.js.
// Essas funções são usadas para manipular dados de usuários.
import { listUsers, createUser, updateUser, deleteUser } from "../services/userService.js";

// Cria uma instância de Router. O Router é uma maneira de modularizar e organizar suas rotas.
const router = Router();

// Define uma rota GET para a raiz do endpoint. Essa rota será acionada quando uma requisição GET for feita para '/geral/usuario'.
router.get('/list', async (req, res) => {
    try {
        // Chama a função listUsers para obter a lista de usuários. A função é assíncrona e retornará uma Promise.
        const userlist = await listUsers();
        // Retorna a lista de usuários com status 200 (OK) no formato JSON.
        res.status(200).json(userlist);
    } catch (error) {
        // Em caso de erro, retorna uma mensagem de erro com status 500 (Internal Server Error).
        res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
        console.error('Erro:', error); // Captura e lida com erros

    }
});

// Define uma rota POST para criar um novo usuário. A rota é acionada quando uma requisição POST é feita para '/geral/usuario/create'.
router.post('/create', async (req, res) => {
    try {
        // Chama a função createUser para criar um novo usuário com os dados recebidos no corpo da requisição.
        const user = await createUser(req.body);
        // Retorna o usuário criado com status 201 (Created) no formato JSON.
        res.status(201).json(user);
    } catch (error) {
        // Em caso de erro, adiciona um log detalhado do erro para depuração.
        console.error("Erro ao criar usuário:", error);
        // Verifica se o erro é relacionado a uma tentativa de criar um usuário com um email já existente.
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            // Retorna uma mensagem de erro com status 400 (Bad Request) se o email já estiver no banco.
            res.status(400).json({ message: 'Já existe um usuário com esse EMAIL no banco!' });
        } else if (error.message.includes('required')) {
            // Retorna uma mensagem de erro com status 400 (Bad Request) se algum campo obrigatório estiver faltando.
            res.status(400).json({ message: 'Informação obrigatória não foi enviada pelo formulário.' });
        } else {
            // Retorna uma mensagem de erro genérica com status 500 (Internal Server Error) para outros tipos de erro.
            res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
        }
    }
});

// Define uma rota PUT para atualizar um usuário existente. A rota é acionada quando uma requisição PUT é feita para '/geral/usuario/edit/:userId'.
router.put('/update/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const updatedUser = await updateUser(userId, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        if (error.message.includes('já está cadastrado')) {
            res.status(400).json({ message: 'Já existe um usuário com esse email no banco!' });
        } else if (error.message.includes('required')) {
            res.status(400).json({ message: 'Informação obrigatória não foi enviada pelo formulário.' });
        } else {
            res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
        }
    }
});



// Define uma rota DELETE para excluir um usuário existente. A rota é acionada quando uma requisição DELETE é feita para '/geral/usuario/:userId'.
router.delete('/delete/:userId', async (req, res) => {
    // Obtém o ID do usuário a ser excluído a partir dos parâmetros da URL.
    const userId = req.params.userId;
    try {
        // Chama a função deleteUser para excluir o usuário com o ID fornecido.
        await deleteUser(userId);
        // Retorna um status 204 (No Content) indicando que a operação foi bem-sucedida e não há conteúdo para retornar.
        res.status(204).send();
    } catch (error) {
        // Retorna uma mensagem de erro com status 500 (Internal Server Error) em caso de falha.
        res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
    }
});

// Exporta o router para que possa ser utilizado em outros módulos, como o `app.js`.
export default router;
