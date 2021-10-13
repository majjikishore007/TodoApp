const User = require("../models/user");

const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 * @description
 * setp1
 * check the validationResult and if any error the return the error
 *
 * step2
 * if everything goes fine the store the user in DB
 */

exports.signup = (req, res) => {
  //creating new user
  const user = new User(req.body);

  // getting the prevalidations from express validator
  // somtheing went wrong in the intial checks
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array()[0].msg,
    });
  }

  // if everything goes fine the store the user in db
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT ABLE TO STORE",
      });
    }
    res.json(user);
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array()[0].msg,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "😱 USER EMAIL DOESNT EXISTS",
      });
    }
    if (!user.authentiacte(password)) {
      return res.status(400).json({
        error: "🤥 EMAIL AND PASSSWORD DOESNT MATCH ",
      });
    }
    //creating token
    console.log("SCREET AT LINE 48 AUTH ROUTE", process.env.SCRETE);
    const token = jwt.sign({ _id: user._id }, process.env.SCRETE);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 999 });
    //sending response to frontend
    const { _id, name, email, role } = user;
    console.log(role + "Role of the user");
    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Signout Sucess",
  });
};

//protectedRoutes
exports.isSignedIn = expressJwt({
  secret: process.env.SCRETE,
  userProperty: "auth",
  algorithms: ["sha1", "RS256", "HS256"],
});

//middleware custom

exports.isAuthenticated = (req, res, next) => {
  // console.log("Authentication", req.profile);
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(404).json({
      error: "ACESS denied",
    });
  }
  next();
};
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "your not Admin",
    });
  }
  next();
};
