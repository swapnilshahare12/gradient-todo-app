const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const todo = mongoose.model("todo", todoSchema);

module.exports = todo;
