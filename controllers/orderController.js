const Order = require("../models/order");

const createOrder = async (req, res) => {
  try {
    const orderData = { ...req.body };
    const newOrder = new Order(orderData);
    const createdOrder = await newOrder.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: "Error creating Order" });
    console.error(error);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("orderItems.product", "name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error getting Orders" });
    console.error(error);
  }
};
module.exports = {
  createOrder,
  getOrders,
};
