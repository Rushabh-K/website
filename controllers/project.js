const Project = require("../models/project");

async function handleGenerateProject(req, res) {
  const { project, description, status, priority, dueDate, startDate } =
    req.body;

  await Project.create({
    project,
    description,
    status,
    priority,
    dueDate,
    startDate,
  });

  return res.render("Website/pomodoro");
}

async function handleDeleteProject(req, res) {
  const task = await Project.findOneAndDelete({
    _id: req.params.id,
  });
}

module.exports = {
  handleGenerateProject,
  handleDeleteProject,
};
