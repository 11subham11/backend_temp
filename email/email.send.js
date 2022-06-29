const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config();

const credentials = {
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
}

const transporter = nodemailer.createTransport(credentials)

module.exports = async (to, content) => {
    const contacts = {
        from: "Robot",
        to : to ,
    }
    const email = Object.assign({}, content, contacts)
    await transporter.sendMail(email)

}