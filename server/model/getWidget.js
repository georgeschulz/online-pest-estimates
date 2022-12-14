const WidgetConfig = require('./dataStructures/widgetConfigClass');
const db = require('./db');

module.exports = async (widgetId) => {
    try {
        const { rows: widgetBasic } = await db.query(`SELECT * FROM widgets WHERE widget_id = $1`, [widgetId]);
        const { rows: businessDetails } = await db.query(`
            SELECT 
                businesses.name,
                businesses.hex_primary,
                businesses.hex_secondary
            FROM users
            INNER JOIN businesses
                ON users.user_id = businesses.user_id
            WHERE users.user_id = $1;
        `, [widgetBasic[0].user_id])
        const { rows: details } = await db.query(`SELECT * FROM widget_details WHERE widget_id = $1`, [widgetId])
        const { rows: proposal } = await db.query(`SELECT 
            proposal_templates.proposal_template_id,
            proposal_templates.legal,
            proposal_templates.coveredpests,
            highlighted_features.text,
            highlighted_features.is_included
        FROM proposal_templates LEFT JOIN highlighted_features ON highlighted_features.proposal_template_id = proposal_templates.proposal_template_id WHERE widget_id = $1`, 
        [widgetId]);

        const { legal, proposal_template_id } = proposal[0];

        let covered = ''

        if(proposal[0].coveredPests) {
            covered = proposal[0].coveredPests.split(',')
        }
        
        const { rows: pricingStrategy } = await db.query(`SELECT * FROM pricing_strategies WHERE widget_id = $1`, [widgetId])
        const { rows: targetQuery }  = await db.query(`SELECT * FROM targets WHERE widget_id = $1`, [widgetId]);
        const { rows: benefitQuery } = await db.query(`SELECT * FROM benefits WHERE widget_id = $1`, [widgetId]);

        const widget = new WidgetConfig(
            widgetId, 
            widgetBasic[0], 
            details[0], 
            { legal, covered_pests: covered, proposal_template_id }, 
            pricingStrategy[0], 
            benefitQuery.map(benefit => benefit.text), 
            targetQuery.map(target => target.name),
            proposal.map(feature => [feature.text, feature.is_included]),
            businessDetails[0])
        return widget;
        
    } catch (err) {
        throw new Error(err);
    }
}