const Todo = require("../models/todo");
const User = require("../models/user");

exports.getTodoById = (req, res, next, id) => {
  Todo.findById(id).exec((err, todo) => {
    if (err) {
      console.log(err);
      return res.status(404).json({
        error: "todo not found",
      });
    }
    console.log("Todo get by id", todo);
    req.todo = todo;
    next();
  });
};

exports.createTodo = (req, res) => {
  console.log("creating todo", req.body);
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      error: "make sure to enter the name and description",
    });
  }
  var todo = new Todo(req.body);
  todo.save((err, todo) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to save the purchase list ",
      });
    }
  });
  let todos = [];

  todos.push({
    _id: todo._id,
    name: todo.name,
    description: todo.description,
  });
  //storing in db

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { todos: todos } },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save the purchase list ",
        });
      }
      res.json(user);
    }
  );
};
exports.getTodo = (req, res) => {
  return res.json(req.todo);
};

exports.deleteTodo = (req, res) => {
  let todo = req.todo;
  todo.remove((err, deletedTodo) => {
    if (err) {
      return res.status(400).json({
        error: `unable to remove Todo ${deletedTodo}`,
      });
    }
    res.json({
      message: `successfuly deleted the todo ${deletedTodo}`,
    });
  });
};

exports.updateTodo = (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({
      error: "make sure to enter the name and description",
    });
  }
  let todo = new Todo(req);
  //save to the db
  todo.save((err, todo) => {
    if (err) {
      res.status(400).json({
        error: "todo cant be saved in the db 🥺",
      });
    }
    res.json(todo);
  });
};
exports.getAllTodos = (req, res) => {
  User.findOne({ _id: req.profile._id })
    .populate("todos")
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "No todos  found",
        });
      }
      res.json(user.todos);
    });
};
