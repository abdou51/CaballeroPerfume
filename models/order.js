const mongoose = require("mongoose");
const Product = require("../models/product");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        priceType: {
          type: String,
          required: true,
        },
      },
    ],
    wilaya: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
    },
  },
  { timestamps: true, versionKey: false }
);

orderSchema.pre("save", async function (next) {
  if (!this.isModified("orderItems")) {
    return next();
  }

  const order = this;
  let total = 0;

  for (const item of order.orderItems) {
    const product = await Product.findById(item.product);
    if (product) {
      const priceObject = product.prices.find(
        (price) => price.type === item.priceType
      );
      if (priceObject) {
        total += item.quantity * priceObject.price;
      }
    }
  }

  order.total = total;
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
