const { UserModel } = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res,next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token,process.env.TOKEN_KEY, async(err, data)=>{
    if(err){
      return res.status(401).json({ status: false, message: "Invalid token" });
    }
    const user = await UserModel.findById(data.id);
    if(!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }
    req.user = user; 
    next(); 
  });
};

module.exports.verifyToken = (req, res) => {
  const token = req.cookies.token|| req.headers.authorization?.split(" ")[1];
  if (!token) return res.json({ status: false });
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) return res.json({ status: false });
    const user = await UserModel.findById(data.id);
    if (user)
      return res.json({
        status: true,
        user: { username: user.username, email: user.email },
      });
    else return res.json({ status: false });
  });
};
