const { All_Users } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

// Check for login
const auth = (req, res) => {
  try {
    if (req.user) {
      res.json(req.user);
    } else {
      res.json({ error: "not authorized" });
    }
  } catch (err) {
    console.log(err);
  }
};

// Admin Login
const loginUser = async (req, res) => {
  try {
    const data = req.body.values;
    if (data) {
      const userExists = await All_Users.findOne({
        where: {
          email: data.email,
          isDeleted: 0,
          isConfirmed: 1,
          isSuspended: 0,
        },
      });
      if (userExists) {
        if (userExists.isBlocked === 1) {
          console.log("User is Blocked");
          res.json({ error: "User is Blocked" });
        } else {
          bcrypt
            .compare(data.password, userExists.password)
            .then(async (match) => {
              if (!match) {
                if (userExists.count < 2) {
                  await All_Users.update(
                    { count: userExists.count + 1 },
                    {
                      where: {
                        email: userExists.email,
                      },
                    }
                  );
                  res.json({ error: "Email/Password doesn't match" });
                } else {
                  await All_Users.update(
                    { isBlocked: 1 },
                    {
                      where: {
                        email: userExists.email,
                      },
                    }
                  );
                  return res.json({ error: "Admin is Blocked" });
                }
              } else {
                await All_Users.update(
                  { count: 0},
                  {
                    where: {
                      email: userExists.email,
                    },
                  }
                );

                const token = sign(
                  {
                    id: userExists.id,
                    name: userExists.firstName,
                    email: userExists.email,
                  },
                  "importantsecret"
                );
                return res.json({
                  token,
                  message: "success",
                  id: userExists.id,
                  name: userExists.firstName,
                  email: userExists.email,
                });
              }
            });
        }
      } else {
        console.log("You are Not User");
        res.json({ error: "You are Not User" });
      }
    } else {
      console.log("Invalid");
      res.json({ message: "Invalid" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Register Admin
const registerUser = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    if (data) {
      console.log(data.email);
      const emailExists = await All_Users.findOne({
        where: {
          email: data.email,
        },
      });
      const phoneExists = await All_Users.findOne({
        where: {
          phone: data.phone,
        },
      });

      if (emailExists || phoneExists) {
        res.json({
          error:
            "User is already registered with the given Phone Number or Email",
        });
        console.log(
          "User is already registered with the given Phone Number or Email "
        );
      } else {
        await bcrypt.hash(data.password, 10).then((hash) => {
          console.log(hash);
          All_Users.create({ ...data, password: hash });
        });
        res.json({ message: "User has been successfully registered" });
      }
    } else
      (error) => {
        console.log(error);
      };
  } catch (err) {
    res.json(err)
    console.log(err);
  }
};

//Get all Users
const getAllUsers = async (req, res) => {
  try {
    const users = await All_Users.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

//Get User by Id
const getUser = async (req, res) => {
  try {
    const data = await All_Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//Delete User by Id
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await All_Users.update(
        {
          isDeleted: 1,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.json({ message: "DELETED User SUCCESSFULLY" });
    } else {
      res.json({ error: " Error while Deleting" });
    }
  } catch (err) {
    console.log(err);
  }
};

// SuspendUser By Id
const suspendUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await All_Users.update(
        {
          isSuspended: 1,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.json({ message: "User Suspended" });
    } else {
      res.json({ error: "Error while suspending Admin" });
    }
  } catch (err) {
    console.log(err);
  }
};

//Block User by Id
const blockUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await All_Users.update(
        {
          isBlocked: 1,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.json({ message: "User Blocked" });
    } else {
      res.json({ error: "Error while Blocking Admin" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUser,
  deleteUser,
  suspendUser,
  blockUser,
  loginUser,
  auth,
};
