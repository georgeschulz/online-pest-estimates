const PriceStrategy = require('./PricingStrategy');
const FormulaGroup = require('./FormulaGroup');

const { acres, largeYard, smallYard, hourlyRate } = require('./paramters')

const defaultExteriorTimeConfig = {
    base: 75,
    billingOptions: ['monthly', 'service', 'annual'],
    setup: 150,
    frequency: 'Bimonthly',
    xResults: { label: "Property acres", values: [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4] },
    yResults: { label: 'Random Targets', values: ['Ants', 'Spiders', 'Termites']},
    parameterConfig: [
        acres,
        smallYard,
        largeYard,
        hourlyRate
    ],
    _formula: []
}

const exteriorTimeStrategy = new PriceStrategy(defaultExteriorTimeConfig);

const slope = new FormulaGroup();
slope.appendNextOperation('ADD', 'config', 'Minutes to complate a 2 acre exterior?')
slope.appendNextOperation('SUBTRACT', 'config', 'Minutes to complete a 1/4 acre exterior?');
slope.appendNextOperation('DIVIDE', 'constant', 1.75)
exteriorTimeStrategy.addGroup('ADD', slope);

const change = new FormulaGroup();
change.appendNextOperation('ADD', 'value', "Property acres");
change.appendNextOperation('SUBTRACT', 'constant', 2);
exteriorTimeStrategy.addGroup('MULTIPLY', change)

exteriorTimeStrategy.appendNextOperation('ADD', 'config', 'Minutes to complate a 2 acre exterior?')

exteriorTimeStrategy.appendNextOperation('DIVIDE', 'constant', 60);
exteriorTimeStrategy.appendNextOperation('MULTIPLY', 'config', 'Desired hourly rate for technician');

module.exports = {
    defaultExteriorTimeConfig
}