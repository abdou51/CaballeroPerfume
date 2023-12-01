const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    season: {
      type: String,
      enum: ["Summer", "Winter", "Spring", "Autumn"],
    },
    sexe: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
    },
    image1: {
      type: String,
    },
    image2: {
      type: String,
    },
    descriptions: [
      {
        language: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
    prices: [
      {
        type: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
