const doIfNumber = require('../helpers/doIfNumber');

module.exports.add = function add(value1, value2) {
    return doIfNumber([value1, value2], () => value1 + value2);
}

module.exports.subtract = function (value1, value2) {
    return doIfNumber([value1, value2], () => value1 - value2);
}

module.exports.multiply = function (value1, value2) {
    return doIfNumber([value1, value2], () => value1 * value2);
}

module.exports.divide = function (value1, value2) {
    return doIfNumber([value1, value2], () => value1 / value2);
}

module.exports.exponent = function (value1, value2) {
    return doIfNumber([value1, value2], () => Math.pow(value1, value2));
}