const express = require("express");
const planRouter = express.Router();
const {
  deletePlan,
  getAllPlans,
  getPlan,
  updatePlan,
  createPlan,
  checkInput,
  queryAdder
} = require("../controllers/planController");
// api/plans => post
const { protectRoute,isAuthorized } = require("../controllers/authController");

planRouter
  .route("")
  .get(protectRoute, isAuthorized(["admin"]), getAllPlans)
  .post(checkInput, createPlan);
planRouter.route("/best-5-plans").get(queryAdder, getAllPlans);
planRouter
  .route("/:id")
  .patch(updatePlan)
  .delete(protectRoute, isAuthorized(["admin", "resto owner"]))
  .get(getPlan);
module.exports = planRouter;
