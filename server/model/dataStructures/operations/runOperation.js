const { add, subtract, multiply, divide, exponent } = require('../operations/arithmetic')

module.exports.runOperation = function(operation, price, value) {
    //handle the operation in the value
    if(operation.type === 'ADD') {
        return add(price, value)
    } else if(operation.type === 'SUBTRACT') {
        return subtract(price, value);
    } else if(operation.type === 'MULTIPLY') {
        return multiply(price, value);
    } else if(operation.type === 'DIVIDE') {
        return divide(price, value);
    } else if(operation.type === 'EXPONENT') {
        return exponent(price, value);
    } else {
        throw new Error('The operation in the formula was not recognized');
    }
}