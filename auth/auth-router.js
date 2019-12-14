const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../database/dbHelper");

router.post("/register", async (req, res) => {
  // implement registration
  let { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  password = hash;

  try {
    const user = await User.addUser({ username, password });
    if (user.length) {
      res.status(200).json({ message: "user added to db" });
    } else {
      res.status(400).json({ message: "username already exists" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
