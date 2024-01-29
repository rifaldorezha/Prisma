const express = require("express");
const router = express.Router();
const checkError = require("../middlewares/error.js");

const userRouter = require("./user.router.js");
const profileRouter = require("./profile.router.js");

router.use("/users", userRouter);
router.use("/profile", profileRouter);

router.use(checkError);

module.exports = router;
