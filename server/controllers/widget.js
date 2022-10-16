const createWidget = require('../model/createWidget');
const { demoConfig } = require('../model/dataStructures/timeDifficultyStrategy');
const updatePriceStrategyConfig = require ('../model/updatePriceStrategyConfig');
const getWidgetById = require('../model/getWidget');

const createWidgetController = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const newWidget = await createWidget(userId);
        res.status(201).send({
            message: 'The widget has been created',
            data: newWidget
        })
    } catch (err) {
        res.status(400).send({
            message: 'There was a problem creating the widget',
            data: {}
        })
        console.log(err)
    }
}

const updatePriceStrategy = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const { widgetId } = req.params;

        await updatePriceStrategyConfig('Test2', widgetId, demoConfig);
        const newConfig = await getWidgetById(widgetId);
        console.log(newConfig)

        res.status(200).send({
            message: 'Widget pricing configuration successfully updated',
            data: newConfig
        })

    } catch (err)  {
        res.status(400).send({
            message: 'There was a problem updating the widgets pricing configuration',
            data: {}
        })
        console.log(err);
    }
}

module.exports = {
    createWidgetController,
    updatePriceStrategy
}