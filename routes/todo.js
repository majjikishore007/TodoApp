const express = require("express");
const router = express.Router();

const {
  getTodoById,
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo,
  getAllTodos,
} = require("../controllers/todo");

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { pushTodoList } = require("../controllers/user");
//parm
router.param("userId", getUserById);
router.param("todoId", getTodoById);

//create routes
router.post("/todo/create/:userId", isSignedIn, isAuthenticated, createTodo);

//read routes
router.get("/todo/:todoId/:userId", isSignedIn, isAuthenticated, getTodo);

//delete and update routes
router.delete("/todo/:todoId/:userId", isSignedIn, isAuthenticated, deleteTodo);

//update todo

router.put("/todo/:todoId/:userId", isSignedIn, isAuthenticated, updateTodo);

//listing routes
router.get("/todos/:userId", isSignedIn, isAuthenticated, getAllTodos);

module.exports = router;
