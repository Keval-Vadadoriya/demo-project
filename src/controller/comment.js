const Product = require("../models/Product");

const comment = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.query.id,
    }).exec();

    const commentObj = {
      comment: req.body.comment,
      owner: req.user._id,
    };

    product.comments.push(commentObj);

    product.save().then((product) => {
      res.send(product);
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = comment;
