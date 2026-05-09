const { Signup,Login } = require("../controllers/AuthController");
const {userVerification, verifyToken} = require("../middlewares/AuthMiddleware")
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login",Login);
router.get('/verify',verifyToken)

module.exports = router;
