const { unixToDatabaseDate } = require('../helpers/unixToDatabaseDate');
const { createOrder } = require('./createOrder');
const db = require('./db');

module.exports.activateUser = async (session, subscription, userId) => {
    try {
        const renewalDate = unixToDatabaseDate(subscription.current_period_end);
        await db.query(`UPDATE users SET active = true, renewal_date = $1 WHERE user_id = $2;` , [renewalDate, userId]);
        await createOrder(session, userId, subscription, 'initial subscription');
    } catch (err) {
        console.log(err);
        throw new err;
    }
}