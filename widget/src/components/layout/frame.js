function Frame({ children }) {
    return (
        <div id="pricing-widget-container">
            <div class="pricing-widget-inner-container">
                {children}
            </div>
        </div>
    )
}

export default Frame;