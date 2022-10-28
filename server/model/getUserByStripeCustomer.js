const db = require('./db');

module.exports.getUserByStripeCustomer = async (stripeCustomerId) => {
    try {
        const { rows } = await db.query(`SELECT user_id FROM users WHERE stripe_customer_id = $1;`, [stripeCustomerId]);
        return rows[0]['user_id'];
    } catch (err) {
        console.log(err);
        throw new err;
    }
}