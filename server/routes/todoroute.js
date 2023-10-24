const express = require("express");
const Router = express.Router();
const {
  addTodo,
  removeTodo,
  changeTodoStatus,
  allTodos,
  editTask,
} = require("../controllers/todocontroller");

Router.post("/add-todo", addTodo);
Router.post("/remove-todo", removeTodo);
Router.post("/change-todo-status", changeTodoStatus);
Router.post("/edit-task", editTask);
Router.get("/all-todos", allTodos);

module.exports = Router;
