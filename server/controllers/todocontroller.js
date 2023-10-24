const todolists = require("../models/todolists");

const addTodo = async (req, res) => {
  try {
    const addNewTodo = new todolists({
      task: req.body.task,
      status: "pending",
    });
    await addNewTodo.save();
    const allTodos = await todolists.find();
    res
      .status(200)
      .json({ success: true, message: "Task added successfully", allTodos });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err });
  }
};

const removeTodo = async (req, res) => {
  try {
    const deleteTask = await todolists.findByIdAndDelete(req.body.taskId);
    const allTodos = await todolists.find();
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully", allTodos });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err });
  }
};

const changeTodoStatus = async (req, res) => {
  try {
    const changeStatus = await todolists.findByIdAndUpdate(req.body.taskId, {
      status: req.body.status,
    });
    const allTodos = await todolists.find();
    res.status(200).json({ success: true, allTodos });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err });
  }
};

const editTask = async (req, res) => {
  try {
    const updateTask = await todolists.findByIdAndUpdate(req.body.editTaskId, {
      task: req.body.task,
    });
    const allTodos = await todolists.find();
    res
      .status(200)
      .json({ success: true, message: "Task updated successfully", allTodos });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err });
  }
};

const allTodos = async (req, res) => {
  try {
    const allTodos = await todolists.find();
    res.status(200).json({ success: true, allTodos });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err });
  }
};

module.exports = { addTodo, removeTodo, changeTodoStatus, allTodos, editTask };
