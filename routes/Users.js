const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const userController = require("../controllers/userController")


// login Auth
router.get("/auth", validateToken, userController.auth)

//Login Admin
router.post("/login",  userController.loginUser)

// Register Admin
router.post('/register',  userController.registerUser)

//Get all Admins
router.get("/all", validateToken, userController.getAllUsers)

//Get admin by id
router.get("/single/:id", validateToken, userController.getUser )

//Delete Admin by id
router.get("/delete/:id", validateToken, userController.deleteUser)

//Suspend Admin by id
router.get("/suspend/:id", validateToken,  userController.suspendUser)

//Get Admin by Id
router.get("/block/:id", validateToken, userController.blockUser)


module.exports = router;
