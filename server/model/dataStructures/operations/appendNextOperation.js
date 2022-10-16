module.exports.appendNextOperation = function appendNextOperation(type, aggregate, parameter) {
    this._formula.push({ type, aggregate, parameter })
}