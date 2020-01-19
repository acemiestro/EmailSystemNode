const userModel = require("../models/userModel");

module.exports.getUser = async function(req, res) {
  const { id } = req.body;
  const user = await userModel.findById(id);
  res.json({ user });
};
