const express = require("express");
const router = express.Router();
const { login, refresh, logout } = require("../controllers/authController");
const authLimiter = require("../middlewares/loginLimitter");

router.route("/").post(authLimiter, login);

router.route("/refresh").get(refresh);

router.route("/logout").post(logout);

module.exports = router;
