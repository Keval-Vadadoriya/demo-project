const mongoose = require("../db/mongoose");

const productSchema = mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },
    ProductType: {
      type: String,
      required: true,
      ref: "ProductType",
    },
    Price: {
      type: Number,
      required: true,
    },
    Like: {
      type: Number,
      default: 0,
    },
    Dislike: {
      type: Number,
      default: 0,
    },
    Comment: [
      {
        type: String,
      },
    ],
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
