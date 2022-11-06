import { useSelector } from "react-redux";
import { selectCoverImageUrl } from "../../redux/configSlice";

function Banner() {
    const image = useSelector(selectCoverImageUrl);

    return (
        <div className="pricing-widget-banner">
            <div className="pricing-widget-banner-container">
                <img src={image} className="pest-widget-banner" />
            </div>
        </div>
    );
}

export default Banner;