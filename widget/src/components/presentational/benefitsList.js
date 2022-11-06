import check from '../../assets/checkTransparent.png';
import { selectHexSecondary } from '../../redux/configSlice';
import { useSelector } from 'react-redux';

function BenefitsList({ list }) {
    const backgroundColor = useSelector(selectHexSecondary);

    return (
        <ul className="pricing-widget-benefits-list">
            {list.map((item, index) => (
                <li key={index}><img src={check} style={{'backgroundColor': backgroundColor}} className="pricing-widget-check" /><span>{item}</span></li>
            ))}
        </ul>
    )
}

export default BenefitsList;