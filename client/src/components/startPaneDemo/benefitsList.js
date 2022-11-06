import check from './checkTransparent.png';
import { useSelector } from 'react-redux';
import { selectHexSecondary } from '../../redux/authSlice';

function BenefitsList({ list }) {
    const backgroundColor = useSelector(selectHexSecondary);
    console.log(backgroundColor)

    return (
        <ul className="pricing-widget-benefits-list">
            {list.map((item, index) => (
                <li key={index}><img src={check} style={{'backgroundColor': '#' + backgroundColor}} className="pricing-widget-check" /><span>{item}</span></li>
            ))}
        </ul>
    )
}

export default BenefitsList;