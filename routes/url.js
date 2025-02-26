const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("website/dashboard");
});

router.get("/billing", (req, res) => {
  return res.render("website/billing");
});
router.get("/myTask", (req, res) => {
  return res.render("website/myTasks");
});
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
