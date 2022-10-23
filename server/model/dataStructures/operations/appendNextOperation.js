module.exports.appendNextOperation = function appendNextOperation(type, aggregate, parameter) {
    this._config._formula.push({ type, aggregate, parameter })
}