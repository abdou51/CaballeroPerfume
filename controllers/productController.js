const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const productData = { ...req.body };
    console.log(productData);
    const newProduct = new Product(productData);
    const createdProduct = await newProduct.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: "Error creating Product" });
    console.log(error);
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving Clients.");
  }
};

const updateProduct = async (req, res) => {
  try {
    const productData = { ...req.body };
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      productData,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product Not found",
      });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating Product",
    });
    console.log(error);
  }
};
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting Product" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
