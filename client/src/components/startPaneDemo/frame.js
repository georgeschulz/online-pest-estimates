import Loading from '../loading/loading';

function Frame({ children, isLoading = false }) {
    return (
        <div id="pricing-widget-container">
            <div className="pricing-widget-inner-container">
                {isLoading
                    ? <div style={{'width': '100%', 'display': 'flex', 'justifyContent': 'center', 'marginTop': '80px'}}><Loading /></div>
                    : children
                }
            </div>

        </div>
    )
}

export default Frame;