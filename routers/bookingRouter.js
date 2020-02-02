const express = require("express");
const bookingRouter = express.Router();

const{
    createCheckoutSession
} = require("../controllers/bookingController");

bookingRouter.get("/:id", createCheckoutSession);

module.exports = bookingRouter;