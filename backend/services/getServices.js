const mariaDB = require("../configuration/database_config");

function getAllUsers(res) {
  mariaDB
    .select("*")
    .from("user")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("error getting users"));
}

function getAllMessages(res) {
  mariaDB
    .select("*")
    .from("messages")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("error getting users"));
}

function getUserById(req, res) {
  const { id } = req.params;
  mariaDB
    .select("*")
    .from("user")
    .where({ id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("error getting user by id"));
}

module.exports = {
  getAllUsers,
  getUserById,
  getAllMessages,
};
