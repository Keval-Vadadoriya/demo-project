const mongoose = require("../db/mongoose");
const User = require("./User");

const productSchema = mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },
    product_type: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ProductType",
    },
    price: {
      type: Number,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        comment: {
          type: String,
        },
        owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
