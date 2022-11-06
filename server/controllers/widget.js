const createWidget = require('../model/createWidget');
const { defaultTimeDifficultyConfig } = require('../model/dataStructures/timeDifficultyStrategy');
const updatePriceStrategyConfig = require ('../model/updatePriceStrategyConfig');
const getWidgetById = require('../model/getWidget');
const { defaultTargetConfig } = require('../model/dataStructures/targetStrategy');
const { updateWidgetDetails } = require('../model/updateWidgetDetails');
const { updateWidgetProposal } = require('../model/updateWidgetProposal');
const { deleteWidget } = require('../model/deleteWidget');
const getWidget = require('../model/getWidget');
const getUserWidgetsModel = require('../model/getUserWidgets');
const { publishWidget } = require('../model/publishWidget');
const { defaultSquareFeetConfig } = require('../model/dataStructures/squareFeetStrategy');
const { defaultExteriorTimeConfig } = require('../model/dataStructures/exteriorTimeStrategy');
const { defaultInteriorTimeConfig } = require('../model/dataStructures/interiorTimeStrategy');
const { getProposalTemplate } = require('../model/getProposalTemplate');
const { createContact } = require('../model/createContact');
const { createProposal } = require('../model/createProposal');
const { addProposalFeatures } = require('../model/addProposalFeatures');
const postmark = require('postmark');
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

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
            } else if (strategyType === 'Square Feet Strategy') {
                configToUpdate = defaultSquareFeetConfig
            } else if (strategyType === 'Exterior Time Strategy') {
                configToUpdate = defaultExteriorTimeConfig;
            } else if (strategyType === 'Interior Time Strategy') {
                configToUpdate = defaultInteriorTimeConfig;
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

        console.log(config)
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

const deleteWidgetController = async (req, res, next) => {
    try {
        const { widgetId } = req.params;
        await deleteWidget(widgetId);

        res.status(200).send({
            message: 'Widget successfully deleted',
            data: { widgetId }
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({
            message: 'There was a problem deleting the widget',
            data: {}
        })
    }
}

const toggleActiveWidget = async (req, res, next) => {
    try {
        const { widgetId } = req.params;
        await publishWidget(widgetId);

        res.status(200).send({
            message: 'Widget status successfully updated',
            data: { widgetId }
        })
    } catch (e) {
        console.log(e)
        res.status(400).send({
            message: 'There was a problem publishing the widget',
            data: {}
        })
    }
}

const createContactController = async (req, res) => {
    try {
        const { widgetId } = req.params;
        const { name, email, phone } = req.body;
        const newContact = await createContact(widgetId, name, email, phone);

        if(process.env.FEATURE_CONTACT_SUCCESS_EMAIL === 'on') {
            client.sendEmailWithTemplate({
                "From": "service@bettertermite.com",
                "To": "service@bettertermite.com",
                "TemplateAlias": "user-invitation-1",
                "TemplateModel": {
                  "product_url": "https://onlinepestestimates.herokuapp.com/",
                  "product_name": "Online Pest Estimates",
                  "name": name,
                  "email": email,
                  "phone": phone,
                  "program": "Unlimitted Plan",
                  "company_name": "Online Pest Estimates",
                  "company_address": "123 ABC Lane",
                  "invite_sender_name": "Online Pest Estimates",
                  "invite_sender_organization_name": "Online Pest Estimates",
                  "action_url": "https://onlinepestestimates.herokuapp.com/",
                  "support_email": "https://onlinepestestimates.herokuapp.com/",
                  "live_chat_url": "https://onlinepestestimates.herokuapp.com/",
                  "help_url": "https://onlinepestestimates.herokuapp.com/"
                }
              });
        }

        res.status(201).send({
            message: 'Contact successfully created',
            data: newContact
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: 'There was a problem creating the contact',
            data: {}
        })
    }
}

const createProposalController = async (req, res, next) => {
    try {
        //get the widet id so we can get the proposal template
        const { widgetId } = req.params;
        //get the pricing and the response id from the request body so we can generate the proposal and link tables
        const { recurringPrice, setupFee, frequency, billingFrequency, responseId, proposalTemplateId, description, program, isAgreed, name } = req.body;

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        //get the proposal template from proposal_templates table and the highlighted_features
        const proposalTemplate = await getProposalTemplate(widgetId);

        //create the proposal in the proposals table
        const newProposal = await createProposal(responseId, proposalTemplate[0].proposal_template_id, setupFee, recurringPrice, description, proposalTemplate[0].legal, billingFrequency, frequency, program, proposalTemplate[0].coveredpests, isAgreed, ip);

        //add the highlighted features to the proposal__features table
        const highlightedFeatures = await addProposalFeatures(newProposal.proposal_id, proposalTemplate);

        //send them a copy of the proposal if they have not yet agreed but resquest one
        if((!isAgreed) && process.env.FEATURE_REQUEST_EMAIL_PROPOSAL_ONLY === "on") {
            client.sendEmailWithTemplate({
                "From": "service@bettertermite.com",
                "To": "service@bettertermite.com",
                "TemplateAlias": "user-invitation",
                "TemplateModel": {
                  "product_url": "http://bettertermite.com/all",
                  "product_name": program,
                  "name": name,
                  "action_url": `${process.env.NODE_ENV === 'production' ? 'https://onlinepestestimates.herokuapp.com' : 'http://localhost:3000'}/proposal-view/${newProposal.proposal_id}`,
                  "invite_sender_name": "Online Pest Estimates",
                  "support_email": "service@bettertermite.com",
                  "company_name": "ABC Pest Control",
                  "company_address": "www.abcpestcontrol.com",
                  "invite_sender_organization_name": "ABC Pest Control",
                  "live_chat_url": "www.abcpestcontrol.com",
                  "help_url": "www.abcpestcontrol.com"
                }
              });
        }

        res.status(201).send({
            message: 'Proposal successfully created',
            data: {
                ...newProposal,
                included: highlightedFeatures.filter(feature => feature.is_included),
                notIncluded: highlightedFeatures.filter(feature => !feature.is_included)
            }
        })

    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: 'There was a problem creating the proposal',
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
    updatePriceStrategyConfigController,
    deleteWidgetController,
    toggleActiveWidget,
    createContactController,
    createProposalController
}