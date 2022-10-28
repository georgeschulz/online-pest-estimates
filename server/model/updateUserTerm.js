const db = require('./db');
const { unixToDatabaseDate } = require('../helpers/unixToDatabaseDate');
const { createOrder } = require('./createOrder');

module.exports.updateUserTerm = async (session, subscription, userId) => { 
    try {
        const { current_period_end } = subscription;
        await db.query(`UPDATE users SET renewal_date = $1 WHERE user_id = $2;`, [unixToDatabaseDate(current_period_end), userId]);
        await createOrder(session, userId, subscription, 'recurring subscription');
    } catch (err) {
        console.log(err);
        throw new err;
    }
}