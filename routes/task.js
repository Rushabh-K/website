const express = require("express");
const { handleGenerateTask, handleDeleteTask } = require("../controllers/task");
const router = express.Router();
const Task = require("../models/task");
const { restrictTo } = require("../middlewares/auth");

router.post("/", handleGenerateTask);

router.delete("/:id", handleDeleteTask);

router.get("/", async (req, res) => {
  const task = await Task.find({});
  res.render("Website/myTasks", { tasks: task });
});

module.exports = router;
