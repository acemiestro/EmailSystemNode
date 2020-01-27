const planModel = require("../models/planModel");

module.exports.getHomePage = async function(req, res) {
  const user = req.user
  let plans = await planModel.find().limit(3);
  // console.log(plans);
  res.render("home.pug", { title: "Home Page", plans: plans, user: user });
};
module.exports.getPlansPage = async function(req, res) {
  const user = req.user
  const plans = await planModel.find();

  res.render("plansPage.pug", { title: "Plans page", plans: plans, user: user });
};

module.exports.getLoginPage = function(req, res) {
  const user = req.user
  res.render("login.pug", { title: "Login Page", user: user });
};

module.exports.getSignupPage = function(req, res) {
  res.render("signup.pug", {title: "Signup Page"})
};
