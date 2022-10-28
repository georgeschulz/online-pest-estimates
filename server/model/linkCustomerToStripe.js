const db = require('./db');

module.exports.linkCustomerToStripe = async (userId, stripeCustomerId) => {
    try {
        await db.query(`UPDATE users SET stripe_customer_id = $1 WHERE user_id = $2;`, [stripeCustomerId, userId]);
    } catch (err) {
        console.log(err);
        throw new err;
    }
}