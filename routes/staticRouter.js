const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allurls = await URL.find({});
  return res.render("home", {
    urls: allurls,
  });
});

// router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
//   const allurls = await URL.find({ createdBy: req.user._id });
//   return res.render("home", {
//     urls: allurls,
//   });
// });

router.get("/", (req, res) => {
  return res.render("landingPage/website");
});

router.get("/about", (req, res) => {
  return res.render("landingPage/aboutUs");
});

router.get("/services", (req, res) => {
  return res.render("landingPage/services");
});

router.get("/howItWorks", (req, res) => {
  return res.render("landingPage/howItWorks");
});

router.get("/pricing", (req, res) => {
  return res.render("landingPage/pricing");
});

router.get("/signup", (req, res) => {
  return res.render("login");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
