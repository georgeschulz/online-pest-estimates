import defaultBanner from '../../assets/demoBanner.JPG';

function Banner({ img = defaultBanner }) {
    return (
        <div className="pricing-widget-banner">
            <img src={require('../../assets/demoBanner.JPG')} className="pest-widget-banner" />
        </div>
    );
}

export default Banner;