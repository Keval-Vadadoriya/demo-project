const Product = require("../models/Product");

const mostRecent = async function (req, res) {
  try {
    const product = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(1)
      .populate({
        path: "owner",
        select: {
          _id: 1,
          name: 1,
        },
      });
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = mostRecent;
