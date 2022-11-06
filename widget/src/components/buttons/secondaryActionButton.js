import Check from '../../assets/transparent-check.png'
import { useSelector } from 'react-redux';
import { selectHexPrimary } from '../../redux/configSlice';

function SecondaryActionButton({ text, onClick, isDone = false }) {
    const borderColor = useSelector(selectHexPrimary);

    return (
        <div className="pricing-widget-button">
            <div id="pricing-widget-start-session" style={{'borderColor': borderColor}} className="pricing-widget-button-secondary" onClick={onClick}>
                {!isDone ? text : <img src={Check} alt="check" style={{'width': '25px'}} />}
            </div>
        </div>
    )
}

export default SecondaryActionButton;