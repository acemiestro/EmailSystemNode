const stripe = require('stripe');
const planModel = require("../models/planModel");

module.exports.createCheckoutSession = async function() {
    // id => planModel.finById
    // session => npm install stripe
    const id = req.params.id;
    const plan = await planModel.findById(id);
     
}