import Usuario from "../models/ModeloUsuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ServicoUsuario = {
  cadastrarUsuario: async ({
    nome,
    email,
    telefone,
    senha,
    nivelAcesso,
    segmento,
  }) => {
    try {
      const usuarioExistente = await Usuario.findOne({ email });
      if (usuarioExistente) {
        throw new Error("Email já cadastrado!");
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const novoUsuario = await Usuario.create({
        nome,
        email,
        telefone,
        senha: senhaCriptografada,
        nivelAcesso,
        segmento,
      });

      return novoUsuario;
    } catch (erro) {
      throw erro;
    }
  },

  loginUsuario: async ({ email, senha }) => {
    try {
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        throw new Error("Usuário não encontrado!");
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        throw new Error("Senha inválida!");
      }

      const token = jwt.sign(
        {
          id: usuario._id,
          nivelAcesso: usuario.nivelAcesso,
          nome: usuario.nome,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return token;
    } catch (erro) {
      throw erro;
    }
  },

  listarUsuarios: async () => {
    try {
      return await Usuario.find();
    } catch (erro) {
      throw erro;
    }
  },

  atualizarUsuario: async (id, dadosAtualizados) => {
    try {
      const usuarioAtualizado = await Usuario.findByIdAndUpdate(
        id,
        dadosAtualizados,
        {
          new: true,
        }
      );
      if (!usuarioAtualizado) {
        throw new Error("Usuário não encontrado!");
      }
      return usuarioAtualizado;
    } catch (erro) {
      throw erro;
    }
  },

  excluirUsuario: async (id) => {
    try {
      const usuarioExcluido = await Usuario.findByIdAndDelete(id);
      if (!usuarioExcluido) {
        throw new Error("Usuário não encontrado!");
      }
      return usuarioExcluido;
    } catch (erro) {
      throw erro;
    }
  },
};

export default ServicoUsuario;
