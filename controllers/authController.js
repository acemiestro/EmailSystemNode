const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const KEY = require("../configs/config").KEY;

module.exports.signup = async function(req, res) {
  // 1. create user
  try {
    const user = await userModel.create(req.body);
    // payload
    const id = user["_id"];
    // 2.create Token
    const token = await jwt.sign({id}, KEY);
    // 3. Send the token
    res.cookies("jwt", token, {httpOnly: true})
    res.json({
      user,
      token,
      success: "User Signed Up "
    });
  }
  catch (err) {
    console.log(err);
    res.json({ err });
  }
};
module.exports.login = async function(req, res) {
  try {
    // email,password
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    console.log(user);
    const dbPassword = user.password;
    console.log(dbPassword);
    if (dbPassword == password) {
      const id = user["_id"];
      const token = await jwt.sign({id}, KEY);
      console.log(token);
      res.cookies("jwt", token, {httpOnly: true})
      return res.json({
        user,
        token,
        success: "User logged in "
      });
    } else {
      return res.json({
        data: "something Went wrong"
      });
    }
  } catch (err) {
    return res.json({
      err
    });
  }
};
module.exports.protectRoute = async function(req, res, next) {
  // 1. Get The Token
  // console.log(req.headers.authorization);
  // console.log(req.headers.Authorization);
  // console.log(req.headers);
  try {
    if (req.headers && req.headers.authorization) {
      // 2. Verfiy the token{
      const token = req.headers.authorization.split(" ")[1];
      const ans = await jwt.verify(token, KEY);
      if (ans) {
        next();
      } else {
        res.json({
          data: "Your token is Tempered"
        });
      }
    } else {
      res.json({
        data: "Something went wrong"
      });
    }
    // 3. If verfied Call next;
  } catch (err) {
    res.json(err);
  }
};
module.exports.forgetPassword = async function(req, res) {
  // 1. email
  try {
    if (req.body.email) {
      const { email } = req.body;
      const user = await userModel.findOne({ email });
      const token = user.generateToken();

      user.save();
      res.json({ token,user });
    } else {
      res.json({
        user,
        data: "Please enter youe email"
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
  // 2.  findOne User
  // 3. DB user => random token

  // 4. Client => email token
};
module.exports.resetPassword = async function(req, res) {
  //  1. token,password,confirmPassword
  try {
    console.log(req.body);
    if (req.body.token && req.body.password && req.body.confirmPassword) {
      
      const { token, password, confirmPassword } = req.body;
      console.log(token);
      const user = await userModel.findOne({ token });
      console.log(user);
      user.password = password;
      user.confirmPassword = confirmPassword;
      user.token = undefined;
       user.save();
      res.json({
        data: "Your password has been reset"
      });
    } else {
      res.json({
        data: "Please enter complete Data"
      });
    }
  } catch (err) {
    console.log(err);
    res.json({  err });
  }
  //  2. find user => token
  // user.password =>
  // await user.save();
  // 3. user => update user => password,updatePassword,token => undefined
};
module.exports.isUserVerified = async function(req, res, next) { 
  try {
    if (req.cookies && req.cookies.jwt) {
      // 2. Verfiy the token{
      const token = req.cookies.jwt
      const ans = await jwt.verify(token, KEY);
      if (ans) {
        const user = await userModel.findById(ans.id)
        req.user = user
        next();
      } 
      else {
        next()
      }
    } 
    else {
      next()
    }
    // 3. If verfied Call next;
  } 
  catch (err) {
    res.json(err);
  }
};
module.exports.logOut = function(req, res) {
  res.cookies("jwt", "ssddds", {
    httpOnly: true,
    expires: new Date(Date.now()) 
  })
  res.redirect("/")
};