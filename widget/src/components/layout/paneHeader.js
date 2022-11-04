function PaneHeader({ text, supportingText, emoji, ...props }) {
    return (
        <div class="flex-row">
            <div class="pricing-widget-header-group">
                <span class="pricing-widget-header-medium flex-row">{text}</span>
                <img src={emoji} alt="icon" style={{'width': props.emojiConstraint, 'height': props.emojiConstraint}} class="pricing-widget-heading-emoji" />
            </div>
            <p class="pricing-widget-subheader">{supportingText}</p>
        </div>
    )
}

export default PaneHeader;