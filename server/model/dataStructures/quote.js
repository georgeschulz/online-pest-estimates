class Quote {
    constructor(initial, perService, prepayDiscount, frequency) {
        this.pricing = {};
        this.initial = initial;
        this.perService = perService;
        this.prepayDiscount = prepayDiscount;
        this.frequency = frequency;
        if(frequency === 'Bimonthly') {
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

module.exports.Quote = Quote;