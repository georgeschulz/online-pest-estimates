import ConfigForm from "../ConfigForm/configForm";
import SingleLineText from "../Inputs/SingleLineText";

const runOperation = function (operation, price, value) {
    //handle the operation in the value
    if (operation.type === 'ADD') {
        return add(price, value)
    } else if (operation.type === 'SUBTRACT') {
        return subtract(price, value);
    } else if (operation.type === 'MULTIPLY') {
        return multiply(price, value);
    } else if (operation.type === 'DIVIDE') {
        return divide(price, value);
    } else if (operation.type === 'EXPONENT') {
        return exponent(price, value);
    } else {
        throw new Error('The operation in the formula was not recognized');
    }
}

const extractValue = function (operation, config, results) {
    if (operation.aggregate === 'value') {
        return results[operation.parameter];
    } else if (operation.parameter === 'base') {
        return config.base;
    } else if (operation.aggregate === 'group') {
        let groupTotal = operation.parameter.getValue(config, results);
        return groupTotal
    } else if (operation.aggregate === 'config') {
        return config['parameterConfig'][operation.parameter]['value']
    } else if (operation.aggregate === 'constant') {
        return operation.parameter;
    } else {
        //handle aggregate operations like average and max
        const resultsValues = covertParameterToValues(results, config, operation)
        if (operation.aggregate === 'AGGMAX') {
            return Math.max(...resultsValues)
        } else if (operation.aggregate === 'AGGMIN') {
            return Math.min(...resultsValues)
        } else if (operation.aggregate === 'AVERAGE') {
            return (resultsValues.reduce((prev, current) => prev + current, 0) / resultsValues.length)
        } else if (operation.aggregate === 'COUNT') {
            return resultsValues.length
        } else if (operation.aggregate === 'SUM') {
            return (resultsValues.reduce((prev, current) => prev + current, 0))
        }
    }
}

function appendNextOperation(type, aggregate, parameter) {
    this._formula.push({ type, aggregate, parameter })
}

function add(value1, value2) {
    return doIfNumber([value1, value2], () => value1 + value2);
}

function subtract(value1, value2) {
    return doIfNumber([value1, value2], () => value1 - value2);
}

function multiply(value1, value2) {
    return doIfNumber([value1, value2], () => value1 * value2);
}

function divide(value1, value2) {
    return doIfNumber([value1, value2], () => value1 / value2);
}

function exponent(value1, value2) {
    return doIfNumber([value1, value2], () => Math.pow(value1, value2));
}

const doIfNumber = (arrayOfInputs, doCallback) => {
    if (inputsAreNumbers(arrayOfInputs)) {
        return doCallback();
    } else {
        throw new Error('Error with add operation. Accepts numbers only')
    }
}

const inputsAreNumbers = (arrayOfInputs) => {
    let i = 0;
    let includesNumbers = false;

    while (i < arrayOfInputs.length && !includesNumbers) {
        if (typeof arrayOfInputs[i] != 'number') {
            includesNumbers = true;
        }

        i++;
    }

    return !includesNumbers;
}

const covertParameterToValues = (results, config, operation) => {
    return results[operation.parameter].map(result => {
        return config['parameterConfig'][operation.parameter]['options'].find(element => element.option == result)['value']
    })
}

class Quote {
    constructor(initial, perService, prepayDiscount, frequency) {
        this.pricing = {};
        this.initial = initial;
        this.perService = perService;
        this.prepayDiscount = prepayDiscount;
        this.frequency = frequency;
        if (frequency === 'Bimonthly') {
            this.servicesPerYear = 6
        } else if (frequency === 'Quarterly') {
            this.servicesPerYear = 4;
        } else if (frequency === 'Monthly') {
            this.servicesPerYear = 12;
        } else if (frequency === 'One Time') {
            this.servicesPerYear = 1;
        } else {
            throw new Error('Did not recognize the frequency of the pricing');
        }
    }

    addPricing(type, price) {
        this.pricing = {
            ...this.pricing,
            [type]: price
        }
    }

    addAnnualPricing() {
        this.addPricing('Annual Billing', {
            perService: this.perService,
            billingAmount: this.initial + (this.perService * 12 * this.prepayDiscount),
            initial: null
        })
    }

    addPerServicePricing() {
        this.addPricing('Billed After Service', {
            perService: this.perService,
            billingAmount: this.perService,
            initial: this.initial
        })
    }

    addMonthlyPricing() {
        this.addPricing('Monthly Billing Program', {
            perService: this.perService,
            billingAmount: this.perService / (12 / this.servicesPerYear),
            initial: this.initial
        })
    }
}

class PricingStrategy {
    constructor(config) {
        this._formula = [];
        this._config = config;
    }

    addGroup(type, group) {
        this._formula.push({
            type: type,
            aggregate: 'group',
            parameter: group
        })
        return group;
    }

    calculate(results) {
        let price = 0;
        this._formula.forEach(operation => {
            //get the value
            let value = extractValue(operation, this._config, results)
            price = runOperation(operation, price, value);
        })

        const quote = new Quote(this._config.setup, Math.round(price * 100) / 100, 0.9, 'Bimonthly')

        if (this._config.billingOptions.includes('monthly')) {
            quote.addMonthlyPricing()
        }

        if (this._config.billingOptions.includes('annual')) {
            quote.addAnnualPricing()
        }

        if (this._config.billingOptions.includes('service')) {
            quote.addPerServicePricing();
        }

        return quote;
    }

    extractConfig() {
        return this._config;
    }

    buildConfigForm(handler) {
        const parameters = this._config.parameterConfig
        return (
            <ConfigForm parameters={parameters} updateConfig={handler} />
        )
    }
}


PricingStrategy.prototype.appendNextOperation = appendNextOperation;


export default PricingStrategy;