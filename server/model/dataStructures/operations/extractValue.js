const { covertParameterToValues } = require('../helpers/convertParametertoValues');

module.exports.extractValue = function (operation, config, results) {
    if(operation.aggregate === 'value') {
        return results[operation.parameter];
    } else if(operation.parameter === 'base') {
        return config.base;
    } else if (operation.aggregate === 'group') {
        let groupTotal = operation.parameter.getValue(config, results);
        return groupTotal
    } else if(operation.aggregate === 'config') {
        return config['parameterConfig'].find(parameter => parameter.name == operation.parameter)['value'];
    } else if(operation.aggregate === 'constant') {
        return operation.parameter;
    } else {
        //handle aggregate operations like average and max
        const resultsValues = covertParameterToValues(results, config, operation)
        if(operation.aggregate === 'AGGMAX') {
            return Math.max(...resultsValues)
        } else if(operation.aggregate === 'AGGMIN') {
            return Math.min(...resultsValues)
        } else if(operation.aggregate === 'AVERAGE') {
            return (resultsValues.reduce((prev, current) => prev + current, 0)/resultsValues.length)
        } else if(operation.aggregate === 'COUNT') {
            return resultsValues.length
        } else if(operation.aggregate === 'SUM') {
            return (resultsValues.reduce((prev, current) => prev + current, 0))
        }
    }
}