function SubmitButton({ text, onClick }) {
    return (
        <div className="pricing-widget-button">
            <div id="pricing-widget-start-session" className="pricing-widget-button" onClick={onClick}>{text}</div>
        </div>
    )
}

export default SubmitButton;