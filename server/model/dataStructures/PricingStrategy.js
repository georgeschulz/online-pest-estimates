//working on an extensible class to represent various pricing strategies so that a buider is eventually possible
//note: must map object name -> value
//should add parameters take an object so that values can be reused?

//how will this data be stored?

const { appendNextOperation } = require('./operations/appendNextOperation');
const { extractValue } = require('../dataStructures/operations/extractValue');
const { runOperation } = require('./operations/runOperation');
const { Quote } = require('./quote');

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
        
        const quote = new Quote(this._config.setup, Math.round(price * 100)/100, 0.9, 'Bimonthly')

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

    extractConfig() {
        return this._config;
    }
}


PricingStrategy.prototype.appendNextOperation = appendNextOperation;

module.exports = PricingStrategy;