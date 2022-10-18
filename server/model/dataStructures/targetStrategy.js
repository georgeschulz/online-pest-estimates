const PriceStrategy = require('./PricingStrategy');
const FormulaGroup = require('./FormulaGroup');
const { difficultSurcharge } = require('./paramters');

const defaultTargetConfig = {
    base: 85,
    billingOptions: ['monthly', 'service', 'annual'],
    setup: 150,
    frequency: 'Bimonthly',
    parameterConfig: {
        'Target': [
            { option: 'ants', value: 2 },
            { option: 'rodents', value: 6 },
            { option: 'roaches', value: 10 },
            { option: 'termites', value: 25 },
            { option: 'spiders', value: 4 },
            { option: 'roaches', value: 10 },
            { option: 'roaches', value: 10 },
            { option: 'roaches', value: 10 }
        ]
    }
}

const results = {
    'Target': ['ants', 'rodents', 'termites']
}

const targetStrategy = new PriceStrategy(defaultTargetConfig);

    
//add in any surcharges for pests
targetStrategy.appendNextOperation('ADD', 'config', 'base');
targetStrategy.appendNextOperation('ADD', 'SUM', 'Target');

module.exports = {
    defaultTargetConfig
}