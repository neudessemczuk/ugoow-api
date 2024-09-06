import databaseConnection from '../database/databse.js';
import User from '../models/userSchema.js';
import bcrypt from 'bcrypt';

export const listUsers = async () => {
    await databaseConnection();
    const users = await User.find();
    return users;
};


export const createUser = async (user) => {
    await databaseConnection();

    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;

    // Criar o usuário no banco de dados
    const newUser = await User.create(user);
    return newUser;
};


export const updateUser = async (userId, updatedUserData) => {
    await databaseConnection();

    // Verificar se a nova senha foi fornecida
    if (updatedUserData.password) {
        // Criptografar a nova senha usando bcrypt
        updatedUserData.password = bcrypt.hashSync(updatedUserData.password, 10);
    }

    // Verificar se o Email foi atualizado e se já existe um usuário com o mesmo email
    if (updatedUserData.email) {
        const existingUserWithemail = await User.findOne({ email: updatedUserData.email });
        if (existingUserWithemail && existingUserWithemail._id.toString() !== userId) {
            throw new Error("Este email já está cadastrado.");
        }
    }

    // Atualizar o usuário no banco de dados pelo ID
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    return updatedUser;
};


export const deleteUser = async (userId) => {
    await databaseConnection();
    // Excluir o usuário do banco de dados pelo ID
    await User.findByIdAndDelete(userId);
};

