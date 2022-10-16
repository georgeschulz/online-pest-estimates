//working on an extensible class to represent various pricing strategies so that a buider is eventually possible
//note: must map object name -> value
//should add parameters take an object so that values can be reused?

//how will this data be stored?

const { appendNextOperation } = require('./operations/appendNextOperation');
const { extractValue } = require('../dataStructures/operations/extractValue');
const { runOperation } = require('./operations/runOperation');
const { Quote } = require('./quote');

class PricingStrategy {
    constructor() {
        this._parameters = {};
        this._formula = [];
        this._config = undefined;
    }

    addParameter(parameterObject) {
        const { name, inputType, description, helperText, options } = parameterObject;
        let state;

        //create a structure to store and change state based on type of input
        switch (inputType) {
            case 'singleSelect':
                state = { value: undefined };
                break;
            case 'number':
                state = { value: undefined };
                break;
            case 'multipleSelect':
                state = {
                    _value: [],
                    addValue(value) { this._value.push(value) },
                    removeValue(value) { this._value = this._value.filter(element => element != value) }
                }
                break;
            default:
                throw new Error('Input type did not match any of the availabile options.');
        }

        this._parameters = {
            ...this._parameters,
            [name]: {
                inputType: inputType,
                description: description,
                helperText: helperText,
                options: options,
                state: state
            }
        }
    }

    addParameters(parameterArray) {
        parameterArray.forEach(parameter => {
            this.addParameter(parameter);
        })
    }

    addGroup(type, group) {
        this._formula.push({
            type: type,
            aggregate: 'group',
            parameter: group
        })
        return group;
    }

    calculate(config, results) {
        let price = 0;
        this._formula.forEach(operation => {
            //get the value
            let value = extractValue(operation, config, results)
            price = runOperation(operation, price, value);
        })
        
        const quote = new Quote(config.setup, Math.round(price * 100)/100, 0.9, 'Bimonthly')

        if(config.billingOptions.includes('monthly')) {
            quote.addMonthlyPricing()
        } 
        
        if(config.billingOptions.includes('annual')) {
            quote.addAnnualPricing()
        } 
        
        if(config.billingOptions.includes('service')) {
            quote.addPerServicePricing();
        }
        
        return quote;
    }
}


PricingStrategy.prototype.appendNextOperation = appendNextOperation;

module.exports = PricingStrategy;