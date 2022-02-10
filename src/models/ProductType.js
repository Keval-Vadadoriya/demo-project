const mongoose = require("../db/mongoose");

const productTypeSchema = mongoose.Schema({
  product_type: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ProductType = mongoose.model("ProductType", productTypeSchema);

module.exports = ProductType;
