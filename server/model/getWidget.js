const WidgetConfig = require('./dataStructures/widgetConfigClass');
const db = require('./db');

module.exports = async (widgetId) => {
    try {
        const { rows: widgetBasic } = await db.query(`SELECT * FROM widgets WHERE widget_id = $1`, [widgetId]);
        const { rows: details } = await db.query(`SELECT * FROM widget_details WHERE widget_id = $1`, [widgetId])
        const { rows: proposal } = await db.query(`SELECT 
            proposal_templates.proposal_template_id,
            proposal_templates.legal,
            proposal_features.text,
            proposal_features.is_included
        FROM proposal_templates LEFT JOIN proposal_features ON proposal_features.proposal_template_id = proposal_templates.proposal_template_id WHERE widget_id = $1`, 
        [widgetId]);
        
        const { rows: strategy } = await db.query(`SELECT strategy_id FROM widgets WHERE widget_id = $1`, [widgetId]);
        const { strategy_id } = strategy[0];
        const { rows: pricingStrategy } = await db.query(`SELECT * FROM pricing_strategies WHERE strategy_id = $1`, [strategy_id])
        const { rows: targetQuery }  = await db.query(`SELECT * FROM targets WHERE widget_id = $1`, [widgetId]);
        const { rows: benefitQuery } = await db.query(`SELECT * FROM benefits WHERE widget_id = $1`, [widgetId]);

        const widget = new WidgetConfig(
            widgetId, 
            widgetBasic[0], 
            details[0], 
            proposal[0], 
            pricingStrategy[0], 
            benefitQuery.map(benefit => benefit.text), 
            targetQuery.map(target => target.name))
        return widget;
        
    } catch (err) {
        throw new Error(err);
    }
}