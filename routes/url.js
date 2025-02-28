const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");
const Task = require("../models/task");

const router = express.Router();

router.get("/", async (req, res) => {
  const task = await Task.find({});
  return res.render("website/dashboard", { tasks: task });
});
// router.get("/", async (req, res) => {
//   const task = await Task.find({});
//   res.render("Website/myTasks", { tasks: task });
// });

router.get("/billing", (req, res) => {
  return res.render("website/billing");
});
// router.get("/myTask", (req, res) => {
//   return res.render("website/myTasks");
// });
router.get("/pomodoro", (req, res) => {
  return res.render("website/pomodoro");
});
router.get("/project", (req, res) => {
  return res.render("website/project");
});
router.get("/messages", (req, res) => {
  return res.render("website/Messages");
});

router.post("/123", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
