const userModel = require("../models/user");
const bcrypt = require("bcryptjs");

const getAllUserController = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users) {
      res.status(200).json({ users });
    } else {
      res.status(404).json({ message: "user not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something problem happened" });
  }
};

const signUpController = async (req, res) => {
  let { name, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists." });
    } else {
      try {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
          name: name,
          email: email,
          password: hashPassword,
          blogs: [],
        });
        res.status(201).json({ newUser });
      } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "something problem happened" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      res.status(400).json({ message: "user not found." });
    } else {
      const isCorrectPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (isCorrectPassword) {
        res.status(201).json({ message: "login successful" });
      } else {
        res.status(400).json({ message: "Incorrect Password." });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "something problem happened" });
  }
};

module.exports = { getAllUserController, signUpController, loginController };
