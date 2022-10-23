class FormulaGroup {
    constructor(formula = []) {
        this._formula = formula;
    }

    getValue(config, results) {
        let groupTotal = 0;

        this._formula.forEach(operation => {
            let operationValue = this.extractValue(operation, config, results);
            groupTotal = this.runOperation(operation, groupTotal, operationValue);
        })
        return groupTotal;
    }

    covertParameterToValues(results, config, operation) {
        return results[operation.parameter].map(result => {
            return config['parameterConfig'].find(parameter => parameter.name == operation.parameter)['options'].find(element => element.option == result)['value']
        })
    }

    doIfNumber(arrayOfInputs, doCallback) {
        const inputsAreNumbers = (arrayOfInputs) => {
            let i = 0;
            let includesNumbers = false;
        
            while(i < arrayOfInputs.length && !includesNumbers) {
                if(typeof arrayOfInputs[i] != 'number') {
                    includesNumbers = true;
                } 
                
                i++;
            }
        
            return !includesNumbers;
        }

        if(inputsAreNumbers(arrayOfInputs)) {
            return doCallback();
        } else {
            throw new Error('Error with add operation. Accepts numbers only')
        }
    }

    runOperation(operation, price, value) {
        //handle the operation in the value
        if(operation.type === 'ADD') {
            return this.doIfNumber([price, value], () => price + value)
        } else if(operation.type === 'SUBTRACT') {
            return this.doIfNumber([price, value], () => price - value);
        } else if(operation.type === 'MULTIPLY') {
            return this.doIfNumber([price, value], () => price * value);
        } else if(operation.type === 'DIVIDE') {
            return this.doIfNumber([price, value], () => price / value);
        } else if(operation.type === 'EXPONENT') {
            return this.doIfNumber([price, value], () => Math.pow(price, value));
        } else {
            throw new Error('The operation in the formula was not recognized');
        }
    }

    extractValue(operation, config, results) {
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
            const resultsValues = this.covertParameterToValues(results, config, operation)
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


    appendNextOperation(type, aggregate, parameter) {
        this._formula.push({ type, aggregate, parameter })
    }
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
            billingAmount: (Math.round(this.initial + (this.perService * 12 * this.prepayDiscount) * 100)/100).toFixed(2),
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
            billingAmount: (Math.round(this.perService / (12 / this.servicesPerYear))).toFixed(2),
            initial: this.initial
        })
    }
}

class PricingStrategy {
    constructor(config) {
        this._config = config;
    }

    addGroup(type, group) {
        this._config._formula.push({
            type: type,
            aggregate: 'group',
            parameter: group
        })
        return group;
    }

    calculate(results) {
        let price = 0;
        this._config._formula.forEach(operation => {
            //get the value
            let value = this.extractValue(operation, this._config, results)
            price = this.runOperation(operation, price, value);
        })
        
        //reset to base price if it is below the floor
        if(price < this._config.base) {
            price = this._config.base;
        }

        const quote = new Quote(this._config.setup, (Math.round(price * 100)/100).toFixed(2), 0.9, 'Bimonthly')

        if(this._config.billingOptions.includes('monthly')) {
            quote.addMonthlyPricing()
        } 
        
        if(this._config.billingOptions.includes('annual')) {
            quote.addAnnualPricing()
        } 
        
        if(this._config.billingOptions.includes('service')) {
            quote.addPerServicePricing();
        }
        
        return quote;
    }

    covertParameterToValues(results, config, operation) {
        return results[operation.parameter].map(result => {
            return config['parameterConfig'].find(parameter => parameter.name == operation.parameter)['options'].find(element => element.option == result)['value']
        })
    }

    doIfNumber(arrayOfInputs, doCallback) {
        const inputsAreNumbers = (arrayOfInputs) => {
            let i = 0;
            let includesNumbers = false;
        
            while(i < arrayOfInputs.length && !includesNumbers) {
                if(typeof arrayOfInputs[i] != 'number') {
                    includesNumbers = true;
                } 
                
                i++;
            }
        
            return !includesNumbers;
        }

        if(inputsAreNumbers(arrayOfInputs)) {
            return doCallback();
        } else {
            throw new Error('Error with add operation. Accepts numbers only')
        }
    }

    runOperation(operation, price, value) {
        //handle the operation in the value
        if(operation.type === 'ADD') {
            return this.doIfNumber([price, value], () => price + value)
        } else if(operation.type === 'SUBTRACT') {
            return this.doIfNumber([price, value], () => price - value);
        } else if(operation.type === 'MULTIPLY') {
            return this.doIfNumber([price, value], () => price * value);
        } else if(operation.type === 'DIVIDE') {
            return this.doIfNumber([price, value], () => price / value);
        } else if(operation.type === 'EXPONENT') {
            return this.doIfNumber([price, value], () => Math.pow(price, value));
        } else {
            throw new Error('The operation in the formula was not recognized');
        }
    }

    extractValue(operation, config, results) {
        if(operation.aggregate === 'value') {
            return results[operation.parameter];
        } else if(operation.parameter === 'base') {
            return config.base;
        } else if (operation.aggregate === 'group') {
            const group = new FormulaGroup(operation.parameter._formula)
            let groupTotal = group.getValue(config, results);
            return groupTotal
        } else if(operation.aggregate === 'config') {
            return config['parameterConfig'].find(parameter => parameter.name == operation.parameter)['value'];
        } else if(operation.aggregate === 'constant') {
            return operation.parameter;
        } else {
            //handle aggregate operations like average and max
            const resultsValues = this.covertParameterToValues(results, config, operation)
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

    appendNextOperation(type, aggregate, parameter) {
        this._config._formula.push({ type, aggregate, parameter })
    }

    extractConfig() {
        return this._config;
    }
}

export default PricingStrategy;