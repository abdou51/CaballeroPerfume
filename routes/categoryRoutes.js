const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const userJwt = require("../middlewares/userJwt");

// Define routes

router.post("/", userJwt,categoryController.createCategory);
router.put("/:id", userJwt,categoryController.updateCategory);
router.delete("/:id", userJwt,categoryController.deleteCategory);

module.exports = router;