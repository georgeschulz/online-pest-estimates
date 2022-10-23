function PriceCell({strategy, x, y, xLabel, yLabel, constantResult, billType}) {
    const results = {
        ...constantResult,
        [xLabel]: x,
        [yLabel]: y
    }
    
    const quote = strategy.calculate(results)
    let value = 0;
    
    switch(billType) {
        case 'perService':
            value = quote.perService;
            break;
        case 'monthly':
            value = quote.pricing['Monthly Billing Program'].billingAmount;
            break;
        case 'setup':
            value = quote.initial;
            break;
        case 'annual':
            value = quote.pricing['Annual Billing'].billingAmount;
            break;
        default:
            value = quote.perService;
            break;
    }

    return (
        <td className="border border-slate-600 p-4 w-24">
            ${value}
        </td>
    )
}

export default PriceCell;