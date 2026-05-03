// const {UserModel} = require("../models/UserModel");
// const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

// module.exports.Signup = async (req, res, next) => {
//   try {
//     const { email, password, username, createdAt } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ message: "User already exists" });
//     }
//     const user = await User.create({ email, password, username, createdAt });
//     const token = createSecretToken(user._id);
//     res.cookie("token", token, {
//       withCredentials: true,
//       httpOnly: false,
//     });
//     res
//       .status(201)
//       .json({ message: "User signed in successfully", success: true, user });
//     next();
//   } catch (error) {
//     console.error(error);
//   }
// };

const { UserModel } = require("../model/UserModel");
const { createSecretToken } = require("../utils/SecretToken");

// 👇 THIS IS WHERE YOUR CODE GOES
const Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await UserModel.create({ email, password, username });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 👇 EXPORT
module.exports = { Signup };

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ message: "Incorrect email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({ message: "Incorrect email or password" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,   // 🔥 FIX (important)
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};