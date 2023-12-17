const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const productData = { ...req.body };
    const newProduct = new Product(productData);
    const createdProduct = await newProduct.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: "Error creating Product" });
    console.error(error);
  }
};
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const options = {
      page,
      limit,
      populate: ["category", "image1", "image2"],
    };

    const { docs, totalDocs, totalPages } = await Product.paginate(
      { isDrafted: false },
      options
    );

    const baseUrl = `${req.protocol}://${req.get("host")}/`;
    const productsWithFullUrls = docs.map((product) => {
      if (product.image1 && !product.image1.url.startsWith("http")) {
        product.image1.url = baseUrl + product.image1.url;
      }
      if (product.image2 && !product.image2.url.startsWith("http")) {
        product.image2.url = baseUrl + product.image2.url;
      }
      return product;
    });

    res.json({
      products: productsWithFullUrls,
      currentPage: page,
      totalPages,
      totalProducts: totalDocs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving Products.");
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
    ).populate("category");

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating Product",
    });
    console.error(error);
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
const getOneProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId)
      .populate("category")
      .populate("image1")
      .populate("image2");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const baseUrl = req.protocol + "://" + req.get("host") + "/";
    if (product.image1) {
      product.image1.url = baseUrl + product.image1.url;
    }
    if (product.image2) {
      product.image2.url = baseUrl + product.image2.url;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error getting Product" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getOneProduct,
};
