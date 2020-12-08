const express = require("express");
const router = express.Router();
const RestApi = "/api";
const { postCreateMessages } = require("../services/postServices");

// Create Customer
router.post(`${RestApi}/createMessage/`, (req, res) =>
  postCreateMessages(req, res)
);

module.exports = router;
