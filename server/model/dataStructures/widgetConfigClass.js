class WidgetConfig {
    constructor(id, basic, detail, proposal, pricingStrategy, benefits = [], targets = [], highlightedFeatures = [], businessDetails) {
        this.widgetId = id;
        //this.strategyId = pricingStrategy.strategy_id;
        this.pricingStrategyType = pricingStrategy.type || null,
        this.pricingStrategy = {
            startsAt: pricingStrategy.starts_at,
            config: pricingStrategy.strategy_config
        };
        this.active = basic.active;
        this.details = {
            ...detail,
            billing_frequency: detail.billing_frequency.split(', ')
        };
        this.benefits = benefits
        this.targets = targets;
        this.proposal = {
            ...proposal,
            highlightedFeatures: highlightedFeatures
        };
        this.businessDetails = businessDetails;
    }
}

module.exports = WidgetConfig;