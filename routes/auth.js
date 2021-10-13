const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const { signup, signin, signout } = require("../controllers/auth");

/**
 * @description
 * name must be at least 3 char long
 * emial must be valid one
 * passwod must be at least 3 char long and goes uder validtaion
 */
router.post(
  "/signup",
  [
    check("firstname", "First name must 3 char long at least").isLength({
      min: 3,
    }),
    check("lastname", "Last name must 3 char long at least").isLength({
      min: 2,
    }),
    check("email", "Please enter valid email address").isEmail(),
    check(
      "password",
      "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. "
    )
      .isLength({ min: 4 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
  ],
  signup
);

/**
 * @description
 * email must be a valid one 
 * password mmust be a valid one 
 */
router.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "PASSWORD is required").isLength({ min: 1 }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
