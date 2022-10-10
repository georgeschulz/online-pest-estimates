class WidgetConfig {
    constructor(id, basic, detail, proposal, pricingStrategy, benefits = [], targets = [], highlightedFeatures = []) {
        this.widgetId = id;
        this.strategyId = pricingStrategy.strategy_id;
        this.pricingStrategyType = pricingStrategy.type || null,
        this.pricingStrategy = {
            startsAt: pricingStrategy.starts_at,
            config: pricingStrategy.strategy_config
        };
        this.active = basic.active;
        this.details = detail;
        this.benefits = benefits
        this.targets = targets;
        this.proposal = {
            ...proposal,
            highlightedFeatures: highlightedFeatures
        };
    }
}

module.exports = WidgetConfig;