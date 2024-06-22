const User = require('../models/users');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Register = async (req, res) => {
  try {
    const { Email, Password, FirstName, LastName, Tel } = req.body;

    let user = await User.findOne({ Email });

    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const UID = uuidv4();
    const Role = "user";

    user = new User({
      Email,
      UID,
      FirstName,
      LastName,
      Role,
      Password,
      Tel,
    });

    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(Password, salt);

    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    let user = await User.findOne({ Email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect email or password' });
    }

    const payload = { user: { email: user.Email } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ success: true, token });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
