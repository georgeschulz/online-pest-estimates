const stripe = require('stripe')(process.env.STRIPEKEY)

const createStripeSession = async (req, res) => {
    console.log('hit')
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
        cancel_url: process.env.NODE_ENV === 'production' ? 'https://onlinepestestimates.herokuapp.com/login' : 'http://localhost:3000/login'
    });

    res.status(200).send({
        message: 'Successfully created stripe session link',
        data: session.url
    })

}

module.exports ={
    createStripeSession
}