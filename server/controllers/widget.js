const createWidget = require('../model/createWidget');
const { defaultTimeDifficultyConfig } = require('../model/dataStructures/timeDifficultyStrategy');
const updatePriceStrategyConfig = require ('../model/updatePriceStrategyConfig');
const getWidgetById = require('../model/getWidget');
const { defaultTargetConfig } = require('../model/dataStructures/targetStrategy');
const { updateWidgetDetails } = require('../model/updateWidgetDetails');
const { updateWidgetProposal } = require('../model/updateWidgetProposal');
const getWidget = require('../model/getWidget');

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

const updatePriceStrategyConfigController = async (req, res, next) => {
    try {
        const { widgetId } = req.params;
        const { config, strategyType } = req.body;

        await updatePriceStrategyConfig(strategyType, widgetId, config)
        const newConfig = await getWidgetById(widgetId);

        res.status(200).send({
            message: 'Widget pricing configuration successfully updated',
            data: newConfig
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: 'Could not update the widget pricing configuration',
            data: {} 
        })
    }
}

const updateWidgetDetailsController = async (req, res, next) => {
    try {
        const { widgetId } = req.params;
        const { name, description, frequency, billingFrequency, benefitOne, benefitTwo, benefitThree, targets } = req.body;
        console.log(billingFrequency.map(option => option.type))
        const updatedWidget = await updateWidgetDetails(widgetId, name, description, frequency, billingFrequency.map(option => option.type), benefitOne, benefitTwo, benefitThree, targets)
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

const updateWidgetProposalController = async (req, res, next) => {
    try {
        const { widgetId } = req.params;
        const { legal, covered, notCovered, targetFull } = req.body;
        const updatedWidget = await updateWidgetProposal(widgetId, legal, covered, notCovered, targetFull)
        res.status(200).send({
            message: 'Widget proposal was successfully updated',
            data: updatedWidget
        })
    } catch (e) {
        console.log(e);
        res.status(400).send({
            message: 'Widget proposal could not be updated',
            data: {}
        })
    }
}

const getWidgetByIdController = async (req, res, next) => {
    try {
        const { widgetId } = req.params;
        const widget = await getWidget(widgetId);
        res.status(200).send({
            message: 'Widget successfully retrieved',
            data: widget
        })
    } catch (err) {
        res.status(404).send({
            message: 'Could not find widget',
            data: {}
        })
    }
}

module.exports = {
    createWidgetController,
    updatePriceStrategy,
    updateWidgetDetailsController,
    updateWidgetProposalController,
    getWidgetByIdController,
    updatePriceStrategyConfigController
}