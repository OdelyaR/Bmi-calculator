const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../Contorllers/user");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").get(logout);

module.exports = router;
