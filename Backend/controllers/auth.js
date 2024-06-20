const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  try {
    const { email, password } = req.body;

    var user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    user = new User({
      email,
      password,
    });

    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    var user = await User.findOneAndUpdate({ email }, { new: true });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }

    var payload = {
      user: {
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ success: true, token });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
