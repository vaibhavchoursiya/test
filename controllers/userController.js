const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const responseToExistedUserEmailName = (res, userE, userU) => {
  if (userE && !userU) {
    res.send({ status: "Failed", message: "Email Already Exist." });
  } else if (userU && !userE) {
    res.send({ status: "Failed", message: "Username Already Exist." });
  } else if (userE && userU) {
    res.send({
      status: "Failed",
      message: "UserName or Email Already Exist.",
    });
  }
};

class UserController {
  static userRegister = async (req, res) => {
    const { name, email, password, confirm_password, username } = req.body;
    /* All Field are Required */
    if (name && email && password && confirm_password && username) {
      const userE = await UserModel.findOne({ email: email });
      const userU = await UserModel.findOne({ username: username });

      if (userE || userU) {
        responseToExistedUserEmailName(res, userE, userU);
      } else {
        /* User Dont Exist */
        if (password === confirm_password) {
          try {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
              username: username,
            });
            await newUser.save();
            // Jwt Token

            res
              .status(201)
              .send({ status: "Success", message: " New User is Register" });
          } catch (error) {
            console.log(error);
            res.send({
              status: "Failed",
              message: "Not Able to Register User",
            });
          }
        } else {
          /* Password dont Match */
          res.send({
            status: "Failed",
            message: "Password and Confirm Password do not Match",
          });
        }
      }
    } else {
      res.send({ status: "Failed", message: "All Field Are Required." });
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user !== null) {
          const match = await bcrypt.compare(password, user.password);
          if (email === user.email && match) {
            //JWT token
            res.send({ status: "Success", message: "Login SuccessFul" });
          } else {
            res.send({
              status: "failed",
              message: "Email or Password does not Valid.",
            });
          }
        } else {
          res.send({ status: "Failed", message: "Your Are not Registered." });
        }
      } else {
        res.send({ status: "Failed", message: "All Field Are Required." });
      }
    } catch (e) {
      console.log(e);
      res.send({ status: "Failed", message: "Unable to Login" });
    }
  };
}

module.exports = UserController;
