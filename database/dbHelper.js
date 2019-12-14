const db = require("./dbConfig");

module.exports = {
  addUser,
  getUser
};

function addUser(user) {
  return db("users").insert(user);
}

function getUser(username) {
  return db("users").where("username", username);
}
