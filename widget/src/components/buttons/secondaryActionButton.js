import Check from '../../assets/transparent-check.png'

function SecondaryActionButton({ text, onClick, isDone = false }) {
    return (
        <div className="pricing-widget-button">
            <div id="pricing-widget-start-session" className="pricing-widget-button-secondary" onClick={onClick}>
                {!isDone ? text : <img src={Check} alt="check" style={{'width': '25px'}} />}
            </div>
        </div>
    )
}

export default SecondaryActionButton;