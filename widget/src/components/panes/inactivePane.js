import Frame from "../layout/frame";
import ContentContainer from "../layout/contentContainer";
import SecondaryActionButton from "../buttons/secondaryActionButton";
import PaneHeader from "../layout/paneHeader";

function InactivePane() {
    return (
        <Frame>
            <ContentContainer>
                <div className="pricing-widget-confirmed-container">
                    <PaneHeader
                        text="Oh oh."
                        supportingText=""
                        emoji={''}
                        emojiConstraint="35px"
                    />
                    <br />
                    <br />
                    <p className="pricing-widget-pricing-summary">Something went wrong. This widget is not active. Please contact the company directly or OnlinePest Estimates for help.</p>
                </div>
            </ContentContainer>
        </Frame>
    )
}

export default InactivePane;