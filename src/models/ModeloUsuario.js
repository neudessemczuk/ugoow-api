import mongoose from "mongoose";

const EsquemaUsuario = new mongoose.Schema(
  {
    nome: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    telefone: {
      type: String,
      // required: true,
    },
    senha: {
      type: String,
      required: true,
    },
    // nivelAcesso: {
    //   type: String,
    //   enum: ["Adm", "SubAdm", "Usuario"],
    //   default: "Usuario",
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Usuario", EsquemaUsuario);
