const planModel = require("../models/planModel");

module.exports.getHomePage = async function(req, res) {
  let plans = await planModel.find().limit(3);
  // console.log(plans);
  res.render("home.pug", { title: "Home Page", plans: plans });
};
module.exports.getPlansPage = async function(req, res) {
  const plans = await planModel.find();

  res.render("plansPage.pug", { title: "Plans page", plans });
};

module.exports.getLoginPage = function(req, res) {
  res.render("login.pug", { title: "Login Page" });
};
