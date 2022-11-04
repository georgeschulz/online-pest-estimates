import Frame from "../layout/frame";
import ContentContainer from "../layout/contentContainer";
import SecondaryActionButton from "../buttons/secondaryActionButton";
import PaneHeader from "../layout/paneHeader";
import Hearts from '../../assets/heart-eye-emoji.png'
import { useDispatch, useSelector } from "react-redux";
import { setPane } from "../../redux/paneSlice";
import GreenCheck from '../../assets/success-check.png'
import { createProposal } from "../../redux/proposalSlice";
import { selectProgramName, selectWidgetId, selectFrequency, selectChosenBillingOption, selectProgramSummary, selectProposalTemplateId } from "../../redux/configSlice";

function SignupConfirmationPane() {
    const dispatch = useDispatch();
    const program = useSelector(selectProgramName);
    const widget_id = useSelector(selectWidgetId)
    const frequency = useSelector(selectFrequency);
    const billingFrequency = useSelector(selectChosenBillingOption)
    const description = useSelector(selectProgramSummary)
    const proposalTemplateId = useSelector(selectProposalTemplateId)

    const handleSubmit = () => {
        dispatch(setPane('emailed-confirmation'));
    }
    return (
        <Frame>
            <ContentContainer>
                <div className="pricing-widget-confirmation-check-container">
                    <img src={GreenCheck} alt="Confirmation Check" className="pricing-widget-confirmation-check" />
                </div>
                <div className="pricing-widget-confirmed-container">
                    <PaneHeader
                        text="Wow that was easy!"
                        supportingText="Your all signed up. One of our staff members will contact you shortly to schedule you. Payment will be collected by your technician."
                        emoji={Hearts}
                        emojiConstraint="35px"
                    />
                </div>
                <SecondaryActionButton text="Email Me The Proposal" onClick={handleSubmit} />
            </ContentContainer>
        </Frame>
    )
}

export default SignupConfirmationPane;