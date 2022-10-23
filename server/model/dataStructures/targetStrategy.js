const PriceStrategy = require('./PricingStrategy');
const { difficultSurcharge } = require('./paramters');

const defaultTargetConfig = {
    base: 85,
    billingOptions: ['monthly', 'service', 'annual'],
    setup: 150,
    frequency: 'Bimonthly',
    xResults: { label: "Square Feet", values: [750, 1000, 1500, 2000, 2500, 3000, 3500, 4000] },
    yResults:{ label: 'How much more would you like to charge for each possible target they say they are seeing?', values: []},
    parameterConfig: [difficultSurcharge],
    _formula: []
}

const results = {
    'How much more would you like to charge for each possible target they say they are seeing?': ['ants', 'rodents', 'termites']
}

const targetStrategy = new PriceStrategy(defaultTargetConfig);

    
//add in any surcharges for pests
targetStrategy.appendNextOperation('ADD', 'config', 'base');
targetStrategy.appendNextOperation('ADD', 'SUM', 'How much more would you like to charge for each possible target they say they are seeing?');

module.exports = {
    defaultTargetConfig
}