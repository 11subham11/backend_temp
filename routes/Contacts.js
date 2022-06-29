const express = require("express");
const router = express.Router();

const {Contacts} = require("../models");

  router.post("/contacts", async (req, res) => {
    try {
      const data = req.body
      const contact = await Contacts.create(data);
      if(contact) {
        res.json({ message: "Thanks For Contacting"})
      } else {
          res.json({error: "error"})
      }
     
    } catch (err) {
      console.log(err);
    }
  });

  module.exports = router;