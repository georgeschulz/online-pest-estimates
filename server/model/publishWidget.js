const db = require('./db');

module.exports.publishWidget = async (widgetId) => {
    try {
        await db.query(`UPDATE widgets SET active = NOT active WHERE widget_id = $1`, [widgetId]);
    } catch (err) {
        throw err;
    }
}