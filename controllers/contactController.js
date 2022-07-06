const {Contacts} = require("../models");

const PostContact = async(req, res) => {
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
}
const GetContact = async(req, res) => {
    try {
        const contact = await Contacts.findAll();
        if(contact) {
          res.json(contact)
        } else {
            res.json({error: "error"})
        }
       
      } catch (err) {
        console.log(err);
      }
}

module.exports = {PostContact , GetContact}
    