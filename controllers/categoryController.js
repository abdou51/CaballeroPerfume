const Category = require("../models/category");

const createCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
    });

    const createdCategory = await newCategory.save();

    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(500).json({ error: "Error creating Category" });
  }
};
const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      { new: true } // Return the modified document rather than the original.
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Error updating Category" });
  }
};
const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting Category" });
  }
};


module.exports = {
  createCategory,
  updateCategory,
  deleteCategory
};