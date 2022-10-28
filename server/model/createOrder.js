const db = require('./db');
const { unixToDatabaseDate } = require('../helpers/unixToDatabaseDate');

module.exports.createOrder = async (session, userId, subscription, orderType) => {
    try {
        const amount = subscription.plan.amount;
        const email = session.customer_email;
        const stripePaymentId = subscription.id;
        const stripe_customer_id = session.customer;
        const { current_period_end, current_period_start } = subscription;

        await db.query(`INSERT INTO orders (user_id, amount, stripe_payment_id, stripe_customer_id, type, current_period_start, current_period_end, billing_email, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'recurring payment');`, [userId, amount, stripePaymentId, stripe_customer_id, orderType, unixToDatabaseDate(current_period_start), unixToDatabaseDate(current_period_end), email]);
    } catch (e) {
        console.log(e);
        throw new e;
    }
}