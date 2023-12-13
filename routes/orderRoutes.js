const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const userJwt = require("../middlewares/userJwt");

router.post("/", orderController.createOrder);
router.get("/", userJwt, orderController.getOrders);
router.put("/:id", userJwt, orderController.updateOrder);
module.exports = router;
