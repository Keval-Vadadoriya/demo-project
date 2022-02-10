const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    let user = new User(req.body);
    user = await user.hashPswd();

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = registerUser;
