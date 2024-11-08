import { Router } from "express";

import {
  listProduct,
  createProduct,
  updateProduct,
} from "../services/productService.js";

const router = Router();

router.get("/list", async (req, res) => {
  try {
    const productlist = await listProduct();
    res.status(200).json(productlist);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
    console.error("Erro:", error);
  }
});

router.post("/create", async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
    console.error("Erro:", error);
  }
});

router.put("/update/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const updatedProduct = await updateProduct(productId, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
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
