const express = require("express");
const router = express.Router();

const contactController = require("../Controller/contact_Controller");

router.post("/send", contactController.sendContact);

module.exports = router;