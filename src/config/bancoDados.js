import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const conectarBancoDados = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    console.log('Conexão com o banco de dados bem-sucedida!');
  } catch (erro) {
    console.error('Erro ao conectar ao banco de dados:', erro);
    process.exit(1); 
  }
};

export default conectarBancoDados;
