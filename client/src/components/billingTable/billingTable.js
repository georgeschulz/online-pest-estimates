function BillingTable({setup, recurringPrice, billingFrequency, frequency}) {
    const getNextTwelveMonths = () => {
        const months = [];
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        for(let i = 0; i < 12; i++) {
            months.push(new Date(year, month + i, 1).toLocaleString('default', { month: 'long' }));
        }
        return months;
    }

    const months = getNextTwelveMonths();
    let monthlyPrices = [];
    //create an array that contains a price that reflects the billing amount for that month
    if(billingFrequency === 'Monthly Billing Program') {
        monthlyPrices = months.map((month, index) => {
            if(index === 0) {
                return [month + ' (After Service)', Number(setup).toFixed(2)];
            } else {
                return [month + ' 15th', recurringPrice];
            }
        })
    } else if (billingFrequency === 'Billed After Service') {
        let servicesPerYear;
        if(frequency === 'Monthly') {
            servicesPerYear = 12;
        } else if (frequency === 'Quarterly') {
            servicesPerYear = 4;
        } else if (frequency === 'Bimonthly') {
            servicesPerYear = 6;
        } else if (frequency === 'Annually') {
            servicesPerYear = 1;
        } else if (frequency === 'One Time') {
            servicesPerYear = 1;
        }

        monthlyPrices = months.map((month, index) => {
            if(index === 0) {
                return [month + ' (After Service)', Number(setup).toFixed(2)];
            } else if(index % (12 / servicesPerYear) == 0) {
                return [month, recurringPrice];
            } else {
                return [month, 0];
            }
        })
    } else if (billingFrequency === 'Annual Billing') {
        monthlyPrices = months.map((month, index) => {
            if(index === 0) {
                return [month + ' (After Service)', recurringPrice];
            } else {
                return [month, '0.00'];
            }
        })
    }

    return (
        <div>
            <p><span className='font-semibold text-lg font-poppins mb-6'>Charges</span></p>
            <table className='table-auto border-neutral-700 font-roboto'>
                <thead className="bg-tableheader text-white">
                    <tr>
                        <th className='px-4 py-2 border-neutral-700 text-left'>Month</th>
                        <th className='px-4 py-2 border-neutral-700 text-left'>Charge</th>
                    </tr>
                </thead>
                <tbody className="bg-tableBody text-white">
                    {monthlyPrices.map((price, index) => {
                        return (
                            <tr key={index}>
                                <td className='border px-4 py-2 border-neutral-600'>{price[0]}</td>
                                <td className='border px-4 py-2 w-48 border-neutral-600'>${price[1]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default BillingTable;