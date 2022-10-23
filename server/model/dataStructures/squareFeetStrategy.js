const PriceStrategy = require('./PricingStrategy');
const FormulaGroup = require('./FormulaGroup');

const { squareFeetCoefficient, squareFeet } = require('./paramters');

const defaultSquareFeetConfig = {
    base: 75,
    billingOptions: ['monthly', 'service', 'annual'],
    setup: 150,
    frequency: 'Bimonthly',
    xResults: { label: "Square Feet", values: [750, 1000, 1500, 2000, 2500, 3000, 3500, 4000] },
    yResults: { label: 'Random Targets', values: ['Ants', 'Spiders', 'Termites']},
    parameterConfig: [
        squareFeet,
        squareFeetCoefficient
    ],
    _formula: []
}

const targetStrategy = new PriceStrategy(defaultSquareFeetConfig);

targetStrategy.appendNextOperation('ADD', 'config', 'Extra fee per 100 square feet')
targetStrategy.appendNextOperation('MULTIPLY', 'value', 'Square Feet')
targetStrategy.appendNextOperation('DIVIDE', 'constant', 100)
targetStrategy.appendNextOperation('ADD', 'config', 'base');

module.exports = {
    defaultSquareFeetConfig
}

