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
    await User.addUser({ username, password });
    res.status(200).json({ message: "user added to db" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  // implement login
  const { username, password } = req.body;
  try {
    const user = await User.getUser(username);
    if (user.length && bcrypt.compareSync(password, user[0].password)) {
      const token = generateToken(user[0]);
      req.headers.authorization = token;
      res.status(200).json({
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

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
