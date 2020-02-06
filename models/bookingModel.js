const mongoose = require("mongoose");
const validator = require("validator");
// Database link
const config = require("../configs/config");
// nodejs inbuilt module
const crypto=require("crypto");
// database connection
mongoose
  .connect(config.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(conn => {
    console.log("Booking DB connected");
    // console.log(conn);
  });

bookedPlanSchema = mongoose.Schema({
  planId: {
    type: String,
    required: true
  },
  name:{
    type: String,
    required: [true, "Please enter name of the plan"],
    unique: true
  },
  currentPrice: {
    type: Number,
    min: 40
  },
  bookedOn: {
    type: String,
    default: Date.now()
  }
})

BookingSchema = mongoose.Schema({
  userId:{
    type: String,
    required: true
  },
  bookedPlans: {
    type: [bookedPlanSchema],
    required: true
  }
})

const BookingModel = mongoose.model("BookingModel", BookingSchema);
module.exports = BookingModel;