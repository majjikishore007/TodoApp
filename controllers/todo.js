const Todo = require("../models/todo");
const User = require("../models/user");

exports.getTodoById = (req, res, next, id) => {
  Todo.findById(id).exec((err, todo) => {
    if (err) {
      return res.status(404).json({
        error: "product not found",
      });
    }
    req.todo = todo;
    next();
  });
};
//create todo
exports.createTodo = (req, res) => {
  console.log("creating todo", req.body);
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      error: "make sure to enter the name and description",
    });
  }
  //pushing to the user todo list
  var todo = new Todo({ name, description, userId: req.profile._id });
  todo.save((err, todo) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to save the todo list ",
      });
    }
    res.json(todo);
  });
};

//get todo
exports.getTodo = (req, res) => {
  return res.json(req.todo);
};
// delete the todos
exports.deleteTodo = (req, res) => {
  let todo = req.todo;
  todo.remove((err, deletedTodo) => {
    if (err) {
      return res.status(400).json({
        error: `unable to remove product ${deletedTodo}`,
      });
    }
    res.json({
      message: `successfuly deleted the product ${deletedTodo}`,
    });
  });
};
// update todos
exports.updateTodo = (req, res) => {
  console.log("updating the todo");
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({
      error: "make sure to enter the name and description",
    });
  }
  //save to the db

  console.log(req.body);
  Todo.findByIdAndUpdate(
    { _id: req.todo._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, updatedtodo) => {
      if (err) {
        return res.status(400).json({
          error: "your not authorized to this todo",
        });
      }
      res.json(updatedtodo);
    }
  );
};