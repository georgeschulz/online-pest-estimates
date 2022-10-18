const db = require('./db');
const { v4: uuidv4 } = require('uuid');
const WidgetConfig = require('./dataStructures/widgetConfigClass');

module.exports = async (userId) => {
    try {
        //create a random uuid for the widget id
        const widgetId = uuidv4();

        const { rows: widgetBasic } = await db.query(`INSERT INTO widgets (widget_id, user_id, active) VALUES ($1, $2, false) RETURNING *`, [widgetId, userId])     
        const { rows: details } = await db.query(`INSERT INTO widget_details (widget_id, program, short_description, frequency, billing_frequency, cover_image_url) VALUES ($1, 'New Program', '', 'quarterly', 'service', '') RETURNING *`, [widgetId]);
        const { rows: proposal } = await db.query(`INSERT INTO proposal_templates (legal, widget_id) VALUES ('', $1)`, [widgetId]);
        
        //create the pricing strategy configuration row
        const { rows: pricingStrategy } = await db.query(`INSERT INTO pricing_strategies (strategy_config, widget_id) VALUES ('{}', $1) RETURNING *`, [widgetId])
        
        const widget = new WidgetConfig(widgetId, widgetBasic[0], details[0], proposal[0], pricingStrategy[0])
        
        return widget;

    } catch (err) {
        console.log(err)
    }
}