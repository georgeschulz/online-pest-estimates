import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectConfig, selectTargetOptionList } from "../../redux/widgetSlice";
import PricingStrategy from "../PriceStrategy/PriceStrategy";
import PriceCell from "./PriceCell";

function PricingTable({xResults, yResults}) {
    const config = useSelector(selectConfig);
    let strategy = new PricingStrategy(config);
    const targetList = useSelector(selectTargetOptionList);
    console.log(targetList)
    let xResultMutated = xResults;
    let yResultMutated = yResults;

    if(yResults.label === 'How much more would you like to charge for each possible target they say they are seeing?') {
        yResultMutated = {label: 'How much more would you like to charge for each possible target they say they are seeing?', values: targetList.map(target => [target.option])}
    }

    useEffect(() => {
        strategy = new PricingStrategy(config);
    }, [config])

    return (
        <table className="border-collapse border border-slate-500 mb-10 text-lg">
            <thead>
                <tr>
                    <th className=" bg-primary text-white"></th>
                    <th className=" bg-primary text-white text-center" colSpan={xResults.values.length}>Square Feet</th>
                </tr>
                <tr className="bg-primary text-white">
                    <th className="border border-slate-600 p-2"></th>
                    {xResults.values.map(header => {
                        return (
                            <th key={`header-${header}`} className="border border-slate-600 p-2">{header}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {yResultMutated.values.map((y) => {
                    return (
                        <tr key={`row-${y}`}>
                            <td className="border border-slate-600 p-2 font-bold">{Array.isArray(y) ? y.join(", ") : y}</td>
                            {/*Pivot here */}
                            {xResults.values.map(x => {
                                return (<PriceCell key={`pivot-${x}-${y}`} strategy={strategy} x={x} xLabel={xResults.label} y={y} yLabel={yResults.label} constantResult={{}} />)
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default PricingTable;