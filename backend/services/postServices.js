const mariaDB = require("../configuration/database_config");

function postCreateMessages(req, res) {
  const { message, friendsId } = req.body;
  mariaDB("messages")
    .insert({
      userId: friendsId,
      message,
    })
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => res.status(400).json("Unable to create customer"));
}

module.exports = { postCreateMessages };
