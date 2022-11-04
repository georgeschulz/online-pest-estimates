function ContentContainer({ children, type = 'full' }) {
    return (
        <div className={`pricing-widget-content ${type == 'full' ? 'pricing-widget-content-full' : ''}`}>
            {children}
        </div>
    )
}

export default ContentContainer;