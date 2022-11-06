import Clap from '../../assets/clap.png';
import Confetti from '../../assets/confetti.png';
import Heart from '../../assets/heart-eye-emoji.png';
import Rocket from '../../assets/rocket.png';

function PaneHeader({ text, supportingText, emoji, ...props }) {
    let img;
    switch (emoji) {
        case 'clap':
            img = Clap;
            break;
        case 'confetti':
            img = Confetti;
            break;
        case 'heart':
            img = Heart;
            break;
        case 'rocket':
            img = Rocket;
            break;
        default:
            img = Clap;
    }

    return (
        <div className="flex-row">
            <div className="pricing-widget-header-group">
                <span className="pricing-widget-header-medium flex-row">{text}</span>
                <img src={img} alt="icon" style={{'width': props.emojiConstraint, 'height': props.emojiConstraint}} className="pricing-widget-heading-emoji" />
            </div>
            <p className="pricing-widget-subheader">{supportingText}</p>
        </div>
    )
}

export default PaneHeader;