const express = require("express");
const {
  getAllUserController,
  signUpController,
  loginController,
} = require("../controllers/userControllers");
const router = express.Router();

router.get("/", getAllUserController);
router.post("/signup", signUpController);
router.post("/login", loginController);

module.exports = router;
