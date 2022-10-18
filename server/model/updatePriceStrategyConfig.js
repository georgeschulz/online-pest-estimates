const db = require('./db');
const WidgetConfig = require('./dataStructures/widgetConfigClass');


module.exports = async (type, widgetId, config) => {
    try {
        const { base } = config; 
        const configJson = JSON.stringify(config)
        //get the strategy id
        await db.query(`UPDATE pricing_strategies SET strategy_config = $1, type = $2, starts_at = $3 WHERE widget_id = $4`, [configJson, type, base, widgetId])
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
}