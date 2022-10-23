module.exports.hourlyRate = {
    name: 'Desired hourly rate for technician',
    inputType: 'number',
    description: 'How many dollars in revenue should your technician bring in for every hour in front of a customer?',
    helperText: '130',
    type: 'config',
    value: 130
}

module.exports.thoasandSquareFeet = {
    name:  "Minutes to complete 1000 SQ FT home",
    inputType: 'number',
    description: 'For the average 1000 square foot home house completing this services takes how many minutes to complete a stop',
    helperText: '33',
    type: 'config',
    value: 33
}

module.exports.twoThoasandSquareFeet = {
    name: "Minutes to complete 2000 SQ FT home",
    inputType: 'number',
    description: 'For the average 2000 square foot house completing this services takes how many minutes to complete a stop',
    helperText: '38',
    type: 'config',
    value: 38
}

module.exports.difficultSurcharge = {
    name: "How much more would you like to charge for each possible target they say they are seeing?",
    inputType: 'multipleSelect',
    description: 'This is an additional charge we will add to difficult targets like rodents and spiders. Leave as 0 for pests that do not require extra work.',
    helperText: 10,
    type: 'value',
    labels: ['Target', 'Extra Charge for Pest'],
    options: [
        { option: 'ants', value: 0 },
        { option: 'rodents', value: 6 },
        { option: 'roaches', value: 10 }
    ]
}

module.exports.squareFeetCoefficient = {
    name: "Extra fee per 100 square feet",
    inputType: 'number',
    description: "How much more should the customer be charged for each 100 square feet their house is",
    helperText: 1.5,
    type: 'config',
    value: 1.75
}

module.exports.acres = {
    name: "Property acres",
    inputType: 'number',
    description: 'How many acres is the property we will be servicing?',
    helperText: 1.5,
    type: 'value',
    value: 0.75
}

module.exports.smallYard = {
    name: 'Minutes to complete a 1/4 acre exterior?',
    inputType: 'number',
    description: 'How many minutes would it take to complete an exterior service for a 1/4 acre property.',
    helperText: 'Minutes to complete 1/4 acre',
    type: 'config',
    value: 20
}

module.exports.largeYard = {
    name: 'Minutes to complate a 2 acre exterior?',
    inputType: 'number',
    description: 'How many minutes would it take to complete an exterior service for a 2 acre property.',
    helperText: 'Minutes to complete a 2 acre account',
    type: 'config',
    value: 35
}

module.exports.squareFeet = {
    name: "Square Feet",
    inputType: 'number',
    description: 'How many square feet is your home',
    helperText: 2500,
    type: 'value'
}