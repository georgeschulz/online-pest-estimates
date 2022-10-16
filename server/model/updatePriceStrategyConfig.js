const db = require('./db');
const WidgetConfig = require('./dataStructures/widgetConfigClass');


module.exports = async (type, widgetId, config) => {
    try {
        const { base } = config; 
        const configJson = JSON.stringify(config)
        //get the strategy id
        const { rows: widget } = await db.query(`SELECT strategy_id FROM widgets WHERE widget_id = $1`, [widgetId]);
        const { strategy_id } = widget[0];
        
        console.log(strategy_id)
        await db.query(`UPDATE pricing_strategies SET strategy_config = $1, type = $2, starts_at = $3 WHERE strategy_id = $4`, [configJson, type, base, strategy_id])
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
}