const express = require("express");
const router = express.Router();
const RestApi = "/api";
const {
  getAllUsers,
  getUserById,
  getAllMessages,
} = require("../services/getServices");

// Search Customer
router.get(`${RestApi}/getAllUser`, (req, res) => getAllUsers(res));
router.get(`${RestApi}/getAllMessages`, (req, res) => getAllMessages(res));
router.get(`${RestApi}/getUserById/:id`, (req, res) => getUserById(req, res));

module.exports = router;
