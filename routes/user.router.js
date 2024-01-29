const express = require("express");
const router = express.Router();

const {
  getAllusers,
  getUserId,
  addUser,
  updateUserId,
  deleteUserId,
} = require("../controllers/users.controllers.js");

router.get("/", getAllusers);
router.get("/:id", getUserId);
router.post("/", addUser);
router.put("/:id", updateUserId);
router.delete("/:id", deleteUserId);

module.exports = router;
