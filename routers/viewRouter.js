const viewRouter = require("express").Router();
const { getHomePage ,getPlansPage,getLoginPage} = require("../controllers/viewController");
viewRouter.route("").get(getHomePage);
viewRouter.route("/plans").get(getPlansPage);
viewRouter.route("/login").get(getLoginPage);
module.exports = viewRouter;
