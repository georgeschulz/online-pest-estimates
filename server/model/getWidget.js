const WidgetConfig = require('./dataStructures/widgetConfigClass');
const db = require('./db');

module.exports = async (widgetId) => {
    try {
        const { rows: widgetBasic } = await db.query(`SELECT * FROM widgets WHERE widget_id = $1`, [widgetId]);
        const { rows: details } = await db.query(`SELECT * FROM widget_details WHERE widget_id = $1`, [widgetId])
        const { rows: proposal } = await db.query(`SELECT 
            proposal_templates.proposal_template_id,
            proposal_templates.legal,
            proposal_templates.covered_pests,
            highlighted_features.text,
            highlighted_features.is_included
        FROM proposal_templates LEFT JOIN highlighted_features ON highlighted_features.proposal_template_id = proposal_templates.proposal_template_id WHERE widget_id = $1`, 
        [widgetId]);

        const { legal, covered_pests, proposal_template_id } = proposal[0];
        
        const { rows: strategy } = await db.query(`SELECT strategy_id FROM widgets WHERE widget_id = $1`, [widgetId]);
        const { strategy_id } = strategy[0];
        const { rows: pricingStrategy } = await db.query(`SELECT * FROM pricing_strategies WHERE strategy_id = $1`, [strategy_id])
        const { rows: targetQuery }  = await db.query(`SELECT * FROM targets WHERE widget_id = $1`, [widgetId]);
        const { rows: benefitQuery } = await db.query(`SELECT * FROM benefits WHERE widget_id = $1`, [widgetId]);

        const widget = new WidgetConfig(
            widgetId, 
            widgetBasic[0], 
            details[0], 
            { legal, covered_pests: covered_pests.split(','), proposal_template_id }, 
            pricingStrategy[0], 
            benefitQuery.map(benefit => benefit.text), 
            targetQuery.map(target => target.name),
            proposal.map(feature => [feature.text, feature.is_included]))
        return widget;
        
    } catch (err) {
        throw new Error(err);
    }
}