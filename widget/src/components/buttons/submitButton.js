import { useSelector } from "react-redux";
import { selectHexPrimary } from "../../redux/configSlice";

function SubmitButton({ text, onClick }) {
    const backgroundColor = useSelector(selectHexPrimary);

    return (
        <div className="pricing-widget-button">
            <div id="pricing-widget-start-session" style={{'backgroundColor': backgroundColor}} className="pricing-widget-button" onClick={onClick}>
                <span>{text}</span>    
            </div>
        </div>
    )
}

export default SubmitButton;