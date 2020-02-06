const SK = require("../configs/configs").SK;
const stripe = require("stripe")(SK);
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");
const bookingModel = require("../models/bookingModel");

module.exports.createCheckoutSession = async function(req, res) {
    // id => planModel.finById
    // session => npm install stripe
    const id = req.params.id;
    const plan = await planModel.findById(id);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          name: plan.name,
          description: plan.description,
          amount: plan.price*100,
          currency: 'inr',
          quantity: 1,
        }],
        success_url: 'https://localhost:4000/me',
        cancel_url: 'https://localhost:4000/login',
    });
    res.json({
        session
    })
}

module.exports.createNewBooking = async function (req, res) {
    const planId = req.body.planId;
    const userId = req.body.userId;
    const user = await userModel.findById(userId);
    const plan = await planModel.findById(planId);
  
    if (user.userBookedPlansId == undefined) {
      // 1 first time user
      const order = {
        userId: userId,
        bookedPlans: [
          {
            planId: planId,
            name: plan.name,
            currentPrice: plan.price
  
          }
        ]
      }
      // create a new users booking
      const newOrder = await bookingModel.create(order);
      // user update
      user.userBookedPlansId = newOrder["_id"];
      await user.save({ validateBeforeSave: false });
      return res.json({
        newOrder
      });
    }
    else {
      const newPlan = {
        planId: planId,
        name: plan.name,
        currentPrice: plan.price
      }
      const booking = await bookingModel.findById(user.userBookedPlansId);
      booking.bookedPlans.push(newPlan);
      const newBookedPlans = booking.bookedPlans;
      const newbooking = await bookingModel.findByIdAndUpdate(booking["_id"], {
        bookedPlans: newBookedPlans
      }, { new: true });
      return res.json({
        newbooking,
        success: "New Plan Added"
      });
    }
}
module.exports.createNewBooking = async function (req, res) {
  const planId = req.body.planId;
  const userId = req.body.userId;
  const user = await userModel.findById(userId);
  const plan = await planModel.findById(planId);

  if (user.userBookedPlansId == undefined) {
    // 1 first time user
    const order = {
      userId: userId,
      bookedPlans: [
        {
          planId: planId,
          name: plan.name,
          currentPrice: plan.price

        }
      ]
    }
    // create a new users booking
    const newOrder = await bookingModel.create(order);
    // user update
    user.userBookedPlansId = newOrder["_id"];
    await user.save({ validateBeforeSave: false });
    return res.json({
      newOrder
    });
  }
  else {
    const newPlan = {
      planId: planId,
      name: plan.name,
      currentPrice: plan.price
    }
    const booking = await bookingModel.findById(user.userBookedPlansId);
    booking.bookedPlans.push(newPlan);
    const newBookedPlans = booking.bookedPlans;
    const newbooking = await bookingModel.findByIdAndUpdate(booking["_id"], {
      bookedPlans: newBookedPlans
    }, { new: true });
    return res.json({
      newbooking,
      success: "New Plan Added"
    });
  }
}