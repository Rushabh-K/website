const Task = require("../models/task");

async function handleGenerateTask(req, res) {
  const { task, priority, dueDate, progress } = req.body;

  await Task.create({
    task,
    priority,
    dueDate,
    progress,
  });

  return res.render("Website/pomodoro");
}

async function handleDeleteTask(req, res) {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
  });
}

module.exports = {
  handleGenerateTask,
  handleDeleteTask,
};
