const ProductType = require("../models/ProductType");
const Product = require("../models/Product");

const editProduct = async function (req, res) {
  try {
    const product = await Product.findOne({
      _id: req.query.id,
    });

    if (req.body.owner) {
      throw new Error("Invalid update");
    }

    if (req.user._id.toString() !== product.owner.toString()) {
      throw new Error("unauthorized update");
    }

    if (req.body.product_type) {
      const productType = await ProductType.findOne({
        product_type: req.body.product_type,
      }).exec();

      if (productType.length === 0) {
        throw new Error("invalid ProductType");
      } else {
        req.body.product_type = productType._id;
      }
    }

    const updateProduct = await Product.updateOne(
      {
        _id: req.query.id,
      },
      req.body
    );

    res.send(updateProduct);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = editProduct;
