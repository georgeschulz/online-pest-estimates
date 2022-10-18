module.exports.hourlyRate = {
    name: 'Hourly Rate',
    inputType: 'number',
    description: 'How many dollars in revenue should your technician bring in for every hour in front of a customer?',
    helperText: '130',
    type: 'config',
    value: 130
}

module.exports.thoasandSquareFeet = {
    name: "Small House Minutes",
    inputType: 'number',
    description: 'For the average 1000 square foot home house completing this services takes how many minutes to complete a stop',
    helperText: '33',
    type: 'config',
    value: 33
}

module.exports.twoThoasandSquareFeet = {
    name: "Medium House Minutes",
    inputType: 'number',
    description: 'For the average 1000 square foot house completing this services takes how many minutes to complete a stop',
    helperText: '38',
    type: 'config',
    value: 33
}

module.exports.difficultSurcharge = {
    name: "Difficulty Surcharge",
    inputType: 'multipleSelect',
    description: 'This is an additional charge we will add to difficult targets like rodents and spiders. Leave as 0 for pests that do not require extra work.',
    helperText: 10,
    type: 'value',
    options: [
        { option: 'ants', value: 0 },
        { option: 'rodents', value: 6 },
        { option: 'roaches', value: 10 }
    ]
}

module.exports.squareFeet = {
    name: "Square Feet",
    inputType: 'number',
    description: 'How many square feet is your home',
    helperText: 2500,
    type: 'value'
}