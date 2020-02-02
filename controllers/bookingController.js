const SK = require("../configs/configs").SK;
const stripe = require("stripe")(SK);
const planModel = require("../models/planModel");

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