const mongoose = require("../db/mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    // toLowercase:true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not Email");
      }
    },
  },
  password: {
    type: String,
    rquired: true,
    minlength: 8,
  },
  age: {
    type: Number,
    rquired: true,
    default: 0,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.statics.verifyUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Email");
  }

  const ismatch = await bcrypt.compare(password, user.password);

  if (!ismatch) {
    throw new Error("Invalid Password");
  }
  return user;
};

//  generate JsonWebToken
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "demoproject");
  user.tokens = user.tokens.concat({ token });
  return token;
};

userSchema.pre("save", async function (next) {
  user = this;
  user.password = await bcrypt.hash(user.password, 8);

  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
