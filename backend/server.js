//Getting essentil libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//Getting the router
router = express.Router();

//Calling the library varialbes
app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();
app.set("port", process.env.PORT);

//Setting Routes
const getRoutes = require("./routes/get");
const postRoutes = require("./routes/post");
// const putRoutes = require("./routes/put");

//Getting Routes
app.use("/", getRoutes);
app.use("/", postRoutes);
// app.use("/", putRoutes);

//The port backend listen to
app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
