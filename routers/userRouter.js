const userRouter = require("express").Router();
const multer=require("multer");

var storage = multer.diskStorage({
  filename: function(req, file, cb) {
    cb(null, file.filename + '-' + Date.now() + ".jpeg")
  },
  destination: function(req, file, cb) {
    cb(null, 'public')
  }
})

var fileFilter = function(req, file, cb) {
  try {
    if(file.mimetype.startsWith("image")){
      cb(null, true)
    }
    else{
      // cb(null, false)
      cb(new Error("Wrong file format"))
    }
  }
  catch(err) {
    console.log(err)
  }  
}

var upload = multer({ 
  storage: storage, fileFilter
});

const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  protectRoute
} = require("../controllers/authController");
const { getUser, updateUser } = require("../controllers/userController");
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/getUser").get(getUser);
userRouter.route("/forgetPassword").patch(forgetPassword);
userRouter.route("/resetPassword").patch(resetPassword);

userRouter
  .route("/updateUser/:id")
  .post(protectRoute, upload.single("photo"), updateUser);
// userRouter.route("/updatePassword").patch(updatePassword);
userRouter.route("/signup").post(signup)
module.exports = userRouter;
