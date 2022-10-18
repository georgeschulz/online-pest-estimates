module.exports.covertParameterToValues = (results, config, operation) => {
    return results[operation.parameter].map(result => {
        return config['parameterConfig'][operation.parameter]['options'].find(element => element.option == result)['value']
    })
} 