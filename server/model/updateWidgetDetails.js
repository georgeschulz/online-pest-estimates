const db = require('./db')
const format = require('pg-format');
const getWidget = require('./getWidget');

module.exports.updateWidgetDetails = async (widgetId, name, shortDescription, frequency, billingFrequency, benefitOne, benefitTwo, benefitThree, targets) => {
    try {
        //update the widget_details table
        await db.query(`
            UPDATE widget_details SET
                program = $1,
                short_description = $2,
                frequency = $3,
                billing_frequency = $4
            WHERE widget_id = $5`,
        [name, shortDescription, frequency, billingFrequency.join(', '), widgetId])

        //add benefits and link them via benefits table
        const benefits = [benefitOne, benefitTwo, benefitThree]
        
        await db.query(`DELETE FROM benefits WHERE widget_id = $1`, [widgetId])
        await db.query(format(
            `INSERT INTO benefits (text, widget_id) VALUES %L`, 
            benefits.map(benefit => [benefit, widgetId])    
        ))
        
        await db.query(`DELETE FROM targets WHERE widget_id = $1`, [widgetId])
        await db.query(format(
            `INSERT INTO targets (name, widget_id) VALUES %L`, 
            targets.map(target => [target, widgetId])
        ));
        
        const widget = await getWidget(widgetId);
        return widget;
    } catch (err) { 
        console.log(err);
        throw err;
    }
}