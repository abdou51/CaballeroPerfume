const express = require("express");
const router = express.Router();
const wilayaController = require("../controllers/wilayaController");
const userJwt = require("../middlewares/userJwt");

// Define routes

router.post("/", userJwt, wilayaController.createWilaya);
router.get("/", wilayaController.getWilayas);
router.put("/:id", userJwt, wilayaController.updateWilaya);
router.delete("/:id", userJwt, wilayaController.deleteWilaya);

module.exports = router;
