import Frame from "../layout/frame";
import ContentContainer from "../layout/contentContainer";
import SecondaryActionButton from "../buttons/secondaryActionButton";
import PaneHeader from "../layout/paneHeader";
import GreenCheck from '../../assets/success-check.png'


function EmailedConfirmationPane() {
    return (
        <Frame>
            <ContentContainer>
                <div>
                    <div className="pricing-widget-confirmation-check-container" style={{'marginBottom': '30px'}}>
                        <img src={GreenCheck} alt="Confirmation Check" className="pricing-widget-confirmation-check" />
                    </div>
                    <p className="pricing-widget-confirmation-header"  style={{'marginBottom': '15px'}}>All Done!</p>
                    <p className="pricing-widget-confirmation-subheader">Your proposal has been emailed to you! Your service will be scheduled shortly.</p>
                </div>
                <SecondaryActionButton text="" isDone={true} />
            </ContentContainer>
        </Frame>

    )
}

export default EmailedConfirmationPane;