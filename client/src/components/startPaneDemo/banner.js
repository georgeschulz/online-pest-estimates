import { useSelector } from "react-redux";
import { selectImage } from "../../redux/widgetSlice";

function Banner() {
    const image = useSelector(selectImage);

    return (
        <div className="pricing-widget-banner">
            <img src={image} className="pest-widget-banner" />
        </div>
    );
}

export default Banner;