const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  project: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], required: true },
  dueDate: { type: Date, required: true },
  startDate: { type: Date, required: true },
});

const Project = mongoose.model("project", projectSchema);

module.exports = Project;
