const User = require("../models/User");

const loginUser = async (req, res) => {
  try {
    const user = await User.verifyUser(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = loginUser;
