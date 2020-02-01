const viewRouter = require("express").Router();
const {
  getHomePage,
  getPlansPage,
  getLoginPage,
  getProfilePage,
  getUpdateUserPage,
  getSignupPage
} = require("../controllers/viewController");
const {
  protectRoute,
  isUserVerified,
  logOut
} = require("../controllers/authController");
viewRouter.use(isUserVerified);
viewRouter.route("/logout").get(logOut);
viewRouter.route("/plans").get(protectRoute, getPlansPage);
viewRouter.route("/me").get(protectRoute, getProfilePage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/signup").get(getSignupPage);
viewRouter.route("/updateUser").get(protectRoute, getUpdateUserPage);
viewRouter.route("").get(getHomePage);

module.exports = viewRouter;
