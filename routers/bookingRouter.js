const express = require("express");
const bookingRouter = express.Router();

const{
    createCheckoutSession,
    createNewBooking
} = require("../controllers/bookingController");

bookingRouter.use(protectRoute)
bookingRouter.get("/:id", createCheckoutSession);
bookingRouter.post("/createNewBooking", createNewBooking);
module.exports = bookingRouter;