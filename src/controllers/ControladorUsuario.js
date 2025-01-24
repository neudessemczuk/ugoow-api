import express from 'express';
import ServicoUsuario from '../services/ServicoUsuario.js';
import autenticarToken from '../middlewares/autenticarToken.js';

const router = express.Router();

// Cadastro de usuário
router.post('/cadastrar', async (req, res) => {
  const { nome, email, telefone, senha, nivelAcesso, segmento } = req.body;

  try {
    const usuarioCadastrado = await ServicoUsuario.cadastrarUsuario({
      nome,
      email,
      telefone,
      senha,
      nivelAcesso,
      segmento,
    });
    res.status(201).json(usuarioCadastrado);
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const token = await ServicoUsuario.loginUsuario({ email, senha });
    res.status(200).json({ mensagem: 'Login bem-sucedido!', token });
  } catch (erro) {
    res.status(401).json({ mensagem: erro.message });
  }
});

// Listar todos os usuários (rota protegida)
router.get('/listar', autenticarToken, async (req, res) => {
  try {
    const usuarios = await ServicoUsuario.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
});

// Atualizar usuário (rota protegida)
router.put('/atualizar/:id', autenticarToken, async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, nivelAcesso, segmento } = req.body;

  try {
    const usuarioAtualizado = await ServicoUsuario.atualizarUsuario(id, {
      nome,
      telefone,
      nivelAcesso,
      segmento,
    });
    res.status(200).json(usuarioAtualizado);
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
});

// Excluir usuário (rota protegida)
router.delete('/excluir/:id', autenticarToken, async (req, res) => {
  const { id } = req.params;

  try {
    await ServicoUsuario.excluirUsuario(id);
    res.status(200).json({ mensagem: 'Usuário excluído com sucesso!' });
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
});

export default router;
