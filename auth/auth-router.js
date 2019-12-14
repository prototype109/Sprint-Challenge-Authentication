const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../secretCodes/secret");
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
  try {
    const user = User.getUser(req.body.username);
    if (
      user.length &&
      bcrypt.compareSync(req.body.password, user[0].password)
    ) {
      const token = generateToken(user[0]);
      res
        .status(200)
        .json({
          message: `You have logged in as ${user[0].username}`,
          token: token
        });
    } else {
      res.status(401).json({ message: "incorrect credentials" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

function generateToken(user) {
  const payload = {
    sub: user.username
  };

  const options = {
    expiresIn: "1h"
  };

  jwt.sign(payload, secret, options);
}

module.exports = router;
