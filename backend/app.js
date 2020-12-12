var express = require("express");
var socket = require("socket.io");

const cors = require("cors");
const bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();
app.set("port", process.env.PORT);

const getRoutes = require("./routes/get");
const postRoutes = require("./routes/post");

app.use("/", getRoutes);
app.use("/", postRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);

const io = socket(server);

const mariaDB = require("./configuration/database_config");

io.on("connection", (socket) => {
  socket.on("SEND_MESSAGE", () => {
    let newArr = [];
    mariaDB
      .select("*")
      .from("messages")
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.id = data[i].id;
          obj.userId = data[i].userId;
          obj.message = data[i].message;
          newArr.push(obj);
        }
      })
      .then(() => io.emit("RECEIVE_MESSAGE", newArr))
      .catch((err) => console.log(err.message));
  });
  socket.on("SEND_BY_SENDER", (data) => {
    io.emit("RECEIVE_BY_RECIEVER", data);
  });
});
