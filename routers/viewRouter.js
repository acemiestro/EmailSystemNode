const viewRouter = require("express").Router();
const {getHomePage} = require("../controllers/viewControllers");
viewRouter.route("").get(getHomePage);
module.exports = viewRouter;