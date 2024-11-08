import databaseConnection from "../database/databse.js";
import Product from "../models/productSchema.js";

export const listProduct = async () => {
  await databaseConnection();
  const products = await Product.find();
  return products;
};

export const createProduct = async (product) => {
  await databaseConnection();

  const newProduct = await Product.create(product);
  return newProduct;
};

export const updateProduct = async (productId, updatedProductData) => {
  await databaseConnection();

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updatedProductData,
    {
      new: true,
    }
  );
  return updatedProduct;
};

export const deleteUser = async (userId) => {
  await databaseConnection();
  // Excluir o usuário do banco de dados pelo ID
  await User.findByIdAndDelete(userId);
};
