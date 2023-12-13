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
  const userRole = req.user.role;

  try {
    let query;

    if (userRole === "admin") {
      query = Order.find({ isConfirmed: true });
    } else {
      query = Order.find({ isConfirmed: false });
    }

    const orders = await query.populate("orderItems.product", "name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error getting Orders" });
    console.error(error);
  }
};

const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Error updating Order" });
  }
};
module.exports = {
  createOrder,
  getOrders,
  updateOrder,
};
