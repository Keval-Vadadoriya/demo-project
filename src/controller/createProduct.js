const ProductType = require("../models/ProductType");
const Product = require("../models/Product");

const createProduct = async function (req, res) {
  try {
    const productType = await ProductType.findOne({
      product_type: req.body.product_type,
    }).exec();

    if (productType.length === 0) {
      throw new Error("invalid ProductType");
    }

    req.body.owner = req.user._id;
    req.body.product_type = productType._id;
    let product = new Product(req.body);

    product = await product.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = createProduct;
