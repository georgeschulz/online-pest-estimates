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
    parameterConfig: [
        twoThoasandSquareFeet,
        thoasandSquareFeet,
        hourlyRate,
        squareFeet,
        difficultSurcharge
    ]
}

const results = {
    'Square Feet': 4200,
    'Difficulty Surcharge': ['ants', 'rodents']
}

const timeDifficultyStrategy = new PriceStrategy(defaultTimeDifficultyConfig);

//calculate the slope (ie. the minutes per square feet)
const slope = new FormulaGroup();
slope.appendNextOperation('ADD', 'config', 'Medium House Minutes');
slope.appendNextOperation('SUBTRACT', 'config', 'Small House Minutes');
slope.appendNextOperation('DIVIDE', 'constant', 1000);
timeDifficultyStrategy.addGroup('ADD', slope)

//calculate the change in square footage form the large house max
const change = new FormulaGroup();
change.appendNextOperation('ADD', 'value', 'Square Feet')
change.appendNextOperation('SUBTRACT', 'constant', 2500);
timeDifficultyStrategy.addGroup('MULTIPLY', change);

//add in the minutes it takes to complete a 2500 square foot home
timeDifficultyStrategy.appendNextOperation('ADD', 'config', 'Medium House Minutes');

//convert to hours
timeDifficultyStrategy.appendNextOperation('DIVIDE', 'constant', 60);

//use hourly rate to calculate
timeDifficultyStrategy.appendNextOperation('MULTIPLY', 'config', 'Hourly Rate');
    
//add in any surcharges for pests
timeDifficultyStrategy.appendNextOperation('ADD', 'AGGMAX', 'Difficulty Surcharge');

console.log(timeDifficultyStrategy.calculate(results));

module.exports = {
    defaultTimeDifficultyConfig
}
