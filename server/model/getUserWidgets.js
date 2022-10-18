const db = require('./db');

module.exports = async (userId) => {
    try {
        const { rows } = await db.query(`
            SELECT 
                widgets.widget_id,
                widgets.active,
                pricing_strategies.starts_at,
                pricing_strategies.type,
                widget_details.program,
                widget_details.short_description,
                widget_details.cover_image_url
            FROM widgets 
            LEFT JOIN pricing_strategies ON widgets.widget_id = pricing_strategies.widget_id 
            LEFT JOIN widget_details ON widgets.widget_id = widget_details.widget_id
            WHERE widgets.user_id = $1;
        `, [userId]);
        return rows;
    } catch (err) {
        throw err;
    }
}