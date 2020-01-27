const viewRouter = require("express").Router();
const { getHomePage ,
        getPlansPage,
        getLoginPage,
        getSignupPage } = require("../controllers/viewController");

const { protectRoute,
        isUserVerified,
        logOut } = require("../controllers/authController");

viewRouter.use(isUserVerified)
viewRouter.route("").get(getHomePage);
viewRouter.route("/logout").get(logOut)
viewRouter.route("/plans").get(getPlansPage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/signup").get(getSignupPage);
module.exports = viewRouter;
