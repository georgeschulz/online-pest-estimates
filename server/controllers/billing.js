const { response } = require('express');
const { activateUser } = require('../model/activateUser');
const { getUserByStripeCustomer } = require('../model/getUserByStripeCustomer');
const { linkCustomerToStripe } = require('../model/linkCustomerToStripe');
const { updateUserTerm } = require('../model/updateUserTerm');

const stripe = require('stripe')(process.env.STRIPEKEY)

const createStripeSession = async (req, res) => {
    const user_id = req.user.user_id;

    const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
            {
                price: 'price_1LwyptKmntHLJqZJIbLTJuKg',
                quantity: 1
            }
        ],
        mode: 'subscription',
        success_url: process.env.NODE_ENV === 'production' ? 'https://onlinepestestimates.herokuapp.com/widgets' : 'http://localhost:3000/widgets',
        cancel_url: process.env.NODE_ENV === 'production' ? 'https://onlinepestestimates.herokuapp.com/login' : 'http://localhost:3000/login',
        client_reference_id: user_id
    });

    res.status(200).send({
        message: 'Successfully created stripe session link',
        data: session.url
    })
}

const fulfillInitialOrder = async (req, res) => {
    let event;
    const endpointSecret = 'whsec_97b3fa91a298dc55a5024b690534e4bdb2f95c984b1d99a3fa720eef73076b12';
    const sig = req.headers['stripe-signature'];
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`)
    }

    let subscription;
    let status;
    try {
        switch (event.type) {
            case 'customer.subscription.deleted':
                subscription = event.data.object;
                status = subscription.status;
                // Then define and call a method to handle the subscription deleted.
                // handleSubscriptionDeleted(subscriptionDeleted);
                break;
            case 'checkout.session.completed':
                const clientReferenceId = event.data.object.client_reference_id;
                const stripeCustomerId = event.data.object.customer;
                await linkCustomerToStripe(clientReferenceId, stripeCustomerId);
                break;
            case 'invoice.paid':
                const session = event.data.object;
                const subscriptionId = session.subscription;
                const subscription = stripe.subscriptions.retrieve(subscriptionId);
                const userId = await getUserByStripeCustomer(subscription.customer);
                //create a conditional statement based on whether it is the first payment or not
                if(session.billing_reason === 'subscription_create') {
                    activateUser(session, subscription, userId)
                } else {
                    updateUserTerm(session, subscription, userId);
                }
        } 
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
}

module.exports = {
    createStripeSession,
    fulfillInitialOrder
}