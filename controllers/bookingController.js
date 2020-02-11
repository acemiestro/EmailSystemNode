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
        success_url: `${req.protocol}://${req.get("host")}/me`,
        cancel_url: `${req.protocol}://${req.get("host")}/login`,
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
module.exports.createBooking = async function (request, response) {
  const sig = request.headers['stripe-signature'];
  let event;
  const endpointSecret = END_POINT_SECRET;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    // console.log(event);
  }
  catch (err) {
  return  response.status(400).send(`Webhook Error: ${err.message}`);
  }
  if(event.type=="checkout.session.completed"){
    const userEmail = event.data.object.customer_email;
    console.log(event.data.object);
    const planId = event.data.object.client_reference_id;
    await createNewBooking(userEmail, planId);
    // payment complete
  }
  response.json({ received: true });
}