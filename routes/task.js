const express = require("express");
const { handleGenerateTask, handleDeleteTask } = require("../controllers/task");
const router = express.Router();
const Task = require("../models/task");
const { restrictTo } = require("../middlewares/auth");

// Create task
router.post("/", handleGenerateTask);

// // Get all tasks for user
// router.get("/", restrictTo(["NORMAL"]), async (req, res) => {
//   try {
//     const tasks = await Task.find({ user: req.user._id });
//     res.send(tasks);
//   } catch (error) {
//     res.status(500).send();
//   }
// });

// Delete task
router.delete("/:id", handleDeleteTask);

router.get("/", async (req, res) => {
  const task = await Task.find({});
  res.render("Website/myTasks", { tasks: task });
});

module.exports = router;
