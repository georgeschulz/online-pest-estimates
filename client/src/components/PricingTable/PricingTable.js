import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { seelctBilling, selectConfig, selectTargetOptionList } from "../../redux/widgetSlice";
import PricingStrategy from "../PriceStrategy/PriceStrategy";
import PriceCell from "./PriceCell";

function PricingTable({ xResults, yResults }) {
    const config = useSelector(selectConfig);
    let strategy = new PricingStrategy(config);
    const targetList = useSelector(selectTargetOptionList);
    let xResultMutated = xResults;
    //let yResultMutated = yResults;
    const billingOptions = useSelector(seelctBilling)
    const [billType, setBillType] = useState('perService')
    const [yResultMutated, setYResultMutated] = useState(yResults)

    useEffect(() => {
        if (yResults.label === 'How much more would you like to charge for each possible target they say they are seeing?') {
            //optional feature to add: get a few random combos
            /*
            const lengthsToGet = [2, 2, 2, 3];
            const extraOptions = [];
            lengthsToGet.forEach(combo => {
                let targetTest = targetList.map(target => target.option)
                let output = []
                for(let i = 0; i < combo; i++) {
                    const randomIndex = Math.floor(Math.random() * targetTest.length);
                    const target = targetTest.splice(randomIndex, 1);
                    output.push(target)
                }
                extraOptions.push(output)
            }) */
            
            setYResultMutated({ label: 'How much more would you like to charge for each possible target they say they are seeing?', values: targetList.map(target => [target.option]) })
        }
    }, [])

    useEffect(() => {
        strategy = new PricingStrategy(config);
    }, [config])

    return (
        <div style={{ 'minWidth' : '800px', 'maxWidth' : '1100px'}} className="w-2/3">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-2xl font-semibold font-poppins">Example Pricing Table</p>
                </div>
                <div>
                    <span className="text-lg mr-2 font-semibold">Billing Type</span>
                    <select value={billType} onChange={(e) => setBillType(e.target.value)} className="border-stone-500 border rounded-full text-lg px-5 py-1 mb-1">
                        <option value="perService">Per Service Fee</option>
                        <option value="setup">Setup Fee</option>
                        {billingOptions.some(option => option.type === "Monthly Billing Program" && option.allowed) ? <option value="monthly">Monthly Billing Amount</option> : null}
                        {billingOptions.some(option => option.type === 'Annual Billing' && option.allowed) ? <option value="annual">Annual Billing Amount</option> : null}

                    </select>
                </div>
            </div>
            <table className="border-collapse border border-slate-500 mb-10 text-lg w-full font-roboto" style={{ 'minWidth' : '875px'}}>
                <thead>
                    <tr>
                        <th className=" bg-tableheader text-white"></th>
                        <th className=" bg-tableheader text-white text-center" colSpan={xResults.values.length}>{xResults.label}</th>
                    </tr>
                    <tr className="bg-tableheader text-white">
                        <th className="border border-slate-600 p-2 text-left">{yResults.label === 'How much more would you like to charge for each possible target they say they are seeing?' ? 'Reported Target' : yResults.label }</th>
                        {xResults.values.map(header => {
                            return (
                                <th key={`header-${header}`} className="border border-slate-600 p-2">{header}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody className=" bg-tableBody text-white">
                    {yResultMutated.values.map((y) => {
                        return (
                            <tr key={`row-${y}`}>
                                <td className="border border-slate-600 p-2 font-bold w-48">{Array.isArray(y) ? y.join(", ") : y}</td>
                                {/*Pivot here */}
                                {xResults.values.map(x => {
                                    return (<PriceCell key={`pivot-${x}-${y}`} strategy={strategy} x={x} xLabel={xResults.label} y={y} yLabel={yResults.label} constantResult={{}} billType={billType} />)
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PricingTable;