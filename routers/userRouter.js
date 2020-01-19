const userRouter = require("express").Router();
const {
  signup,
  login,
  forgetPassword,
  resetPassword
} = require("../controllers/authController");
const { getUser } = require("../controllers/userController");
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/getUser").get(getUser);
userRouter.route("/forgetPassword").patch(forgetPassword);
userRouter.route("/resetPassword").patch(resetPassword);
// userRouter.route("/updatePassword").patch(updatePassword);
module.exports = userRouter;
