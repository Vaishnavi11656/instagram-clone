const express = require("express");
const { verifyAuth } = require("../middlewares.js/verifyAuth");
const { userLogin, userSignup } = require("../controllers/auth.controller");
const userRouter = express.Router();

userRouter.post("/login", userLogin);

userRouter.post("/signup", userSignup);

module.exports = { userRouter };