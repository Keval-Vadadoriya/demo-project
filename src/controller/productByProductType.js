const Product = require("../models/Product");

const byProductType = async function (req, res) {
  try {
    const byProductType = await Product.find({
      product_type: req.query.id,
    }).populate({
      path: "owner",
      select: {
        _id: 1,
        name: 1,
      },
    });
    res.send(byProductType);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = byProductType;
