const PriceStrategy = require('./PricingStrategy');
const FormulaGroup = require('./FormulaGroup');
const { hourlyRate, thoasandSquareFeet, twoThoasandSquareFeet, difficultSurcharge, squareFeet } = require('./paramters');

//add billing
//add setup
//create proposal class based on db

const defaultTimeDifficultyConfig = {
    base: 75,
    billingOptions: ['monthly', 'service', 'annual'],
    setup: 150,
    frequency: 'Bimonthly',
    xResults: { label: "Square Feet", values: [750, 1000, 1500, 2000, 2500, 3000, 3500, 4000] },
    yResults:{ label: 'How much more would you like to charge for each possible target they say they are seeing?', values: []},
    parameterConfig: [
        twoThoasandSquareFeet,
        thoasandSquareFeet,
        hourlyRate,
        squareFeet,
        difficultSurcharge
    ],
    _formula: []
}

const results = {
    'Square Feet': 4200,
    'How much more would you like to charge for each possible target they say they are seeing?': ['ants', 'rodents']
}

const timeDifficultyStrategy = new PriceStrategy(defaultTimeDifficultyConfig);

//calculate the slope (ie. the minutes per square feet)
const slope = new FormulaGroup();
slope.appendNextOperation('ADD', 'config', "Minutes to complete 2000 SQ FT home");
slope.appendNextOperation('SUBTRACT', 'config', "Minutes to complete 1000 SQ FT home");
slope.appendNextOperation('DIVIDE', 'constant', 1000);
timeDifficultyStrategy.addGroup('ADD', slope)

//calculate the change in square footage form the large house max
const change = new FormulaGroup();
change.appendNextOperation('ADD', 'value', 'Square Feet')
change.appendNextOperation('SUBTRACT', 'constant', 2500);
timeDifficultyStrategy.addGroup('MULTIPLY', change);

//add in the minutes it takes to complete a 2500 square foot home
timeDifficultyStrategy.appendNextOperation('ADD', 'config', "Minutes to complete 2000 SQ FT home");

//convert to hours
timeDifficultyStrategy.appendNextOperation('DIVIDE', 'constant', 60);

//use hourly rate to calculate
timeDifficultyStrategy.appendNextOperation('MULTIPLY', 'config', 'Desired hourly rate for technician');
    
//add in any surcharges for pests
timeDifficultyStrategy.appendNextOperation('ADD', 'AGGMAX', 'How much more would you like to charge for each possible target they say they are seeing?');

console.log(timeDifficultyStrategy.calculate(results))

module.exports = {
    defaultTimeDifficultyConfig
}
