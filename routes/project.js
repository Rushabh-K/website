const express = require("express");
const {
  handleGenerateProject,
  handleDeleteProject,
} = require("../controllers/project");
const router = express.Router();
const Project = require("../models/project");

router.post("/", handleGenerateProject);

router.delete("/:id", handleDeleteProject);

router.get("/", async (req, res) => {
  const project = await Project.find({});
  res.render("Website/project", { projects: project });
});

module.exports = router;
