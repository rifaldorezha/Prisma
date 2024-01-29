const express = require("express");
const router = express.Router();

const {
  getAllProfile,
  getProfileId,
  addProfile,
  updateProfileId,
  deleteProfileId,
} = require("../controllers/profile.controllers.js");

router.get("/", getAllProfile);
router.get("/:id", getProfileId);
router.post("/", addProfile);
router.put("/:id", updateProfileId);
router.delete("/:id", deleteProfileId);

module.exports = router;
