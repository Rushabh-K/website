const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], required: true },
  dueDate: { type: Date, required: true },
  progress: { type: Number, min: 0, max: 100 },
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
