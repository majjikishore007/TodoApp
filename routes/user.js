var express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userTodoList,
} = require("../controllers/user");
const { isAuthenticated, isSignedIn } = require("../controllers/auth");

router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/todos/:userId", isSignedIn, isAuthenticated, userTodoList);

module.exports = router;
