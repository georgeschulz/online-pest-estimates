import check from '../../assets/check.png';

function BenefitsList({ list }) {
    return (
        <ul className="pricing-widget-benefits-list">
            {list.map((item, index) => (
                <li key={index}><img src={check} className="pricing-widget-check" /><span>{item}</span></li>
            ))}
        </ul>
    )
}

export default BenefitsList;