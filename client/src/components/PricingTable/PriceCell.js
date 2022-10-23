function PriceCell({strategy, x, y, xLabel, yLabel, constantResult}) {
    const results = {
        ...constantResult,
        [xLabel]: x,
        [yLabel]: y
    }
    console.log(results)
    const quote = strategy.calculate(results)

    return (
        <td className="border border-slate-600 p-4 w-24">
            ${quote.perService}
        </td>
    )
}

export default PriceCell;