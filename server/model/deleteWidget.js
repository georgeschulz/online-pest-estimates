const db = require('./db');

module.exports.deleteWidget = async (widgetId) => {
    try {
        await db.query(`DELETE FROM widget_details WHERE widget_id = $1`, [widgetId])
        //get the proposal_template_id so we can clear the higlighted_features table
        const { rows } = await db.query(`SELECT proposal_template_id FROM proposal_templates WHERE widget_id = $1`, [widgetId])
        const { proposal_template_id } = rows[0]
        await db.query(`DELETE FROM highlighted_features WHERE proposal_template_id = $1`, [proposal_template_id])
        await db.query(`DELETE FROM proposal_templates WHERE widget_id = $1`, [widgetId])
        await db.query(`DELETE FROM benefits WHERE widget_id = $1`, [widgetId])
        await db.query(`DELETE FROM targets WHERE widget_id = $1`, [widgetId])
        await db.query(`DELETE FROM pricing_strategies WHERE widget_id = $1`, [widgetId])
        await db.query(`DELETE FROM widgets WHERE widget_id = $1`, [widgetId])
    } catch (err) {
        throw err;
    }
}