// Importa o módulo mongoose, que é uma biblioteca de modelagem de objetos MongoDB para Node.js
import mongoose from "mongoose";
// Importa o módulo dotenv, que carrega variáveis de ambiente a partir de um arquivo .env
import * as dotenv from 'dotenv';
// Carrega as variáveis de ambiente do arquivo .env para process.env
dotenv.config();
// Define uma função assíncrona para conectar ao banco de dados
const databaseConnection = async () => {
    try {
        // Configura o Mongoose para usar a opção de consulta estrita, que evita consultas não mapeadas no esquema
        mongoose.set("strictQuery", true);
        // Conecta ao banco de dados MongoDB usando a URI definida na variável de ambiente MONGODB_URI
        await mongoose.connect(process.env.MONGODB_URI);
        // Exibe uma mensagem de sucesso quando a conexão é bem-sucedida
        console.log("Banco conectado com sucesso!");
    } catch (error) {
        // Exibe uma mensagem de erro se a conexão falhar
        console.log("Error: ", error.message);
    }
}
// Exporta a função databaseConnection para que possa ser usada em outros módulos
export default databaseConnection;
