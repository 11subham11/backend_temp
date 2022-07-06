const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

  // Contact Us Route to post data
  router.post("/contacts", contactController.PostContact );

  // Contact Us Route to Get Data
  router.get("/contacts", contactController.GetContact );



  module.exports = router;