const viewRouter = require("express").Router();
const {
  getHomePage,
  getPlansPage,
  getLoginPage,
  getProfilePage,
  getUpdateUserPage,
  getSignupPage,
  getPlansDetailsPage
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
viewRouter.route("/plans/:id").get(getPlansDetailsPage);
viewRouter.route("").get(getHomePage);

module.exports = viewRouter;
