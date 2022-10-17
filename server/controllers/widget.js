const createWidget = require('../model/createWidget');
const { defaultTimeDifficultyConfig } = require('../model/dataStructures/timeDifficultyStrategy');
const updatePriceStrategyConfig = require ('../model/updatePriceStrategyConfig');
const getWidgetById = require('../model/getWidget');
const { defaultTargetConfig } = require('../model/dataStructures/targetStrategy');
const { updateWidgetDetails } = require('../model/updateWidgetDetails');

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
        const { widgetId } = req.params;
        const { strategyType, config } = req.body;

        let configToUpdate;
        //create the default config if the user is just starting to setup the configuration
        if(config === null) {
            if(strategyType === 'Time Difficulty Strategy') {
                configToUpdate = defaultTimeDifficultyConfig;
            } else if (strategyType === 'Target Strategy') {
                configToUpdate = defaultTargetConfig;
            } else {
                throw new Error('The pricing strategy type name was not recognized');
            }
        } else {
            configToUpdate = config;
        }

        await updatePriceStrategyConfig(strategyType, widgetId, configToUpdate);
        const newConfig = await getWidgetById(widgetId);

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

const updateWidgetDetailsController = async (req, res, next) => {
    try {
        const { widgetId } = req.params;
        const { name, description, frequency, billingFrequency, benefitOne, benefitTwo, benefitThree, targets } = req.body;

        const updatedWidget = await updateWidgetDetails(widgetId, name, description, frequency, billingFrequency, benefitOne, benefitTwo, benefitThree, targets)
        res.status(200).send({
            message: 'Successfully updated widget details',
            data: updatedWidget
        })
    } catch (err) {
        console.log(err);
        res.status(404).send({
            message: 'Failed to update widget details',
            data: {}
        })
    }
}

module.exports = {
    createWidgetController,
    updatePriceStrategy,
    updateWidgetDetailsController
}