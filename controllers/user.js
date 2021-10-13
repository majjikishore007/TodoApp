const User = require("../models/user");
const Todo = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER not found ",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "your not authorized to edit the user details",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};
exports.userTodoList = (req, res) => {
  console.log("finding the todos");
  Todo.find({ user: req.profile._id })
    .populate("user", "_id name ")
    .exec((err, todo) => {
      if (err) {
        return res.status(404).json({
          error: "No todo is this account",
        });
      }
      res.json(todo);
    });
};
exports.pushTodoList = (req, res, next) => {
  let todoList = [];
  console.log("pushing todos", req.body);
  todoList.push({
    _id: Math.random() * 10,
    name: req.name,
    description: req.description,
  });
  //storing in db

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { todos: todoList } },
    { new: true },
    (err, todos) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save the TODO line 72",
        });
      }
      next();
    }
  );
};
