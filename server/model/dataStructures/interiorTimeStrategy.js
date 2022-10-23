const PriceStrategy = require('./PricingStrategy');
const FormulaGroup = require('./FormulaGroup');
const { hourlyRate, thoasandSquareFeet, twoThoasandSquareFeet, squareFeet } = require('./paramters');


const defaultInteriorTimeConfig = {
    base: 75,
    billingOptions: ['monthly', 'service', 'annual'],
    setup: 150,
    frequency: 'Bimonthly',
    xResults: { label: "Square Feet", values: [750, 1000, 1500, 2000, 2500, 3000, 3500, 4000] },
    yResults:{ label: 'Target', values: ['Any pest combo']},
    parameterConfig: [
        twoThoasandSquareFeet,
        thoasandSquareFeet,
        hourlyRate,
        squareFeet
    ],
    _formula: []
}

const interiorTimeStrategy = new PriceStrategy(defaultInteriorTimeConfig);

//calculate the slope (ie. the minutes per square feet)
const slope = new FormulaGroup();
slope.appendNextOperation('ADD', 'config', "Minutes to complete 2000 SQ FT home");
slope.appendNextOperation('SUBTRACT', 'config', "Minutes to complete 1000 SQ FT home");
slope.appendNextOperation('DIVIDE', 'constant', 1000);
interiorTimeStrategy.addGroup('ADD', slope)

//calculate the change in square footage form the large house max
const change = new FormulaGroup();
change.appendNextOperation('ADD', 'value', 'Square Feet')
change.appendNextOperation('SUBTRACT', 'constant', 2500);
interiorTimeStrategy.addGroup('MULTIPLY', change);

//add in the minutes it takes to complete a 2500 square foot home
interiorTimeStrategy.appendNextOperation('ADD', 'config', "Minutes to complete 2000 SQ FT home");

//convert to hours
interiorTimeStrategy.appendNextOperation('DIVIDE', 'constant', 60);

//use hourly rate to calculate
interiorTimeStrategy.appendNextOperation('MULTIPLY', 'config', 'Desired hourly rate for technician');
    
module.exports = {
    defaultInteriorTimeConfig
}
