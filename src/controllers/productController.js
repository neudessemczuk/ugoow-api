import { Router } from "express";

import {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService.js";

const router = Router();

router.get("/list", async (req, res) => {
  try {
    const userlist = await listUsers();
    res.status(200).json(userlist);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
    console.error("Erro:", error);
  }
});

router.post("/create", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res
        .status(400)
        .json({ message: "Já existe um usuário com esse EMAIL no banco!" });
    } else if (error.message.includes("required")) {
      res.status(400).json({
        message: "Informação obrigatória não foi enviada pelo formulário.",
      });
    } else {
      res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
    }
  }
});

router.put("/update/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const updatedUser = await updateUser(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    if (error.message.includes("já está cadastrado")) {
      res
        .status(400)
        .json({ message: "Já existe um usuário com esse email no banco!" });
    } else if (error.message.includes("required")) {
      res.status(400).json({
        message: "Informação obrigatória não foi enviada pelo formulário.",
      });
    } else {
      res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
    }
  }
});

router.delete("/delete/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    await deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
  }
});

export default router;
