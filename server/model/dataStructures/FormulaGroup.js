const { add, subtract, multiply, divide } = require('./operations/arithmetic');
const { appendNextOperation } = require('./operations/appendNextOperation');
const { extractValue } = require('./operations/extractValue');
const { runOperation } = require('./operations/runOperation');

class FormulaGroup {
    constructor() {
        this._formula = [];
    }

    getValue(config, results) {
        let groupTotal = 0;

        this._formula.forEach(operation => {
            let operationValue = extractValue(operation, config, results);
            groupTotal = runOperation(operation, groupTotal, operationValue);
        })
        return groupTotal;
    }
}

FormulaGroup.prototype.appendNextOperation = appendNextOperation;

module.exports = FormulaGroup;