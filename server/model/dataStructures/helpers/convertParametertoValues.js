module.exports.covertParameterToValues = (results, config, operation) => {
    return results[operation.parameter].map(result => {
        return config['parameterConfig'][operation.parameter].find(element => element.option == result)['value']
    })
} 