const db = require('./db')
const format = require('pg-format');
const getWidget = require('./getWidget');

module.exports.updateWidgetProposal = async (widgetId, legal, covered, notCovered, targetFull) => {
    try {
        const { rows: proposal} = await db.query(`
            UPDATE proposal_templates SET
                legal = $1,
                covered_pests = $2
            WHERE widget_id = $3
            RETURNING *
        `, [legal, targetFull.join(), widgetId]);

        const template = proposal[0].proposal_template_id;

        await db.query(`DELETE FROM highlighted_features WHERE proposal_template_id = $1`, [template])
        await db.query(format(`INSERT INTO highlighted_features (text, proposal_template_id, is_included) VALUES %L`,
        [...covered.map(feature => [feature, template, true]), ...notCovered.map(feature => [feature, template, false])]))
        
        const widget = await getWidget(widgetId);
        return widget;
    } catch (err) {
        console.log(err);
        throw err;
    }
}