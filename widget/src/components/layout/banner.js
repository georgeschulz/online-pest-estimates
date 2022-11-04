import defaultBanner from '../../assets/demoBanner.JPG';

function Banner({ img = defaultBanner }) {
    return (
        <div className="pricing-widget-banner">
            <img src={img} className="pest-widget-banner" />
        </div>
    );
}

export default Banner;