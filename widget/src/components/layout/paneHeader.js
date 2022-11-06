import Clap from '../../assets/clap.png';
import Confetti from '../../assets/confetti.png';
import Heart from '../../assets/heart-eye-emoji.png';
import Rocket from '../../assets/rocket.png';

function PaneHeader({ text, supportingText, emoji, ...props }) {
    let img = 'https://onlinepestestimates.herokuapp.com/images/';
    switch (emoji) {
        case 'clap':
            img += 'clap.png';
            break;
        case 'confetti':
            img += 'confetti.png';
            break;
        case 'heart':
            img += 'heart-eye-emoji.png';
            break;
        case 'rocket':
            img += 'rocket.png';
            break;
        default:
            img += 'rocket.png';
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