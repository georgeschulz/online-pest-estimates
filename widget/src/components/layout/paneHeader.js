function PaneHeader({ text, supportingText, emoji, ...props }) {
    return (
        <div className="flex-row">
            <div className="pricing-widget-header-group">
                <span className="pricing-widget-header-medium flex-row">{text}</span>
                <img src={emoji} alt="icon" style={{'width': props.emojiConstraint, 'height': props.emojiConstraint}} className="pricing-widget-heading-emoji" />
            </div>
            <p className="pricing-widget-subheader">{supportingText}</p>
        </div>
    )
}

export default PaneHeader;