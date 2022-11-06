import Frame from "../layout/frame"
import PaneHeader from "../layout/paneHeader";
import ContentContainer from "../layout/contentContainer";
import Confetti from '../../assets/confetti.png'
import SubmitButton from "../buttons/submitButton";
import { useDispatch, useSelector } from "react-redux";
import { setPane } from "../../redux/paneSlice";
import { selectQuote, selectProgramSummary, setBillingOption, selectBillingOptions, selectChosenBillingOption, selectProgramName, selectWidgetId, selectFrequency, selectProposalTemplateId, selectHexSecondary } from "../../redux/configSlice";
import { useState } from "react";
import SecondaryActionButton from "../buttons/secondaryActionButton";
import { agreeToProposalThunk, selectIsProposalSent, toggleSent, selectProposalId } from "../../redux/proposalSlice";
import { createProposal } from "../../redux/proposalSlice";
import { selectResponseId } from "../../redux/contactSlice";
import { selectEmail, selectName } from "../../redux/contactSlice";

function QuotePane() {
    const dispatch = useDispatch();
    const quote = useSelector(selectQuote);
    const programSummary = useSelector(selectProgramSummary);
    const billingOptions = useSelector(selectBillingOptions);
    const chosenBillingOption = useSelector(selectChosenBillingOption);
    const isProposalSent = useSelector(selectIsProposalSent)
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const program = useSelector(selectProgramName);
    const widget_id = useSelector(selectWidgetId)
    const frequency = useSelector(selectFrequency);
    const billingFrequency = useSelector(selectChosenBillingOption)
    const proposalTemplateId = useSelector(selectProposalTemplateId)
    const responseId = useSelector(selectResponseId)
    const email = useSelector(selectEmail)
    const name = useSelector(selectName)
    const proposalId = useSelector(selectProposalId)
    const hexSecondary = useSelector(selectHexSecondary)

    const handleSubmit = async () => {
        await addProposalToDatabase(true);
        dispatch(setPane('signup-confirmed'))
    }

    const handleProposalButton = async () => {
        await addProposalToDatabase(false);
        dispatch(toggleSent())
    }

    const handleBillingClick = (option) => {
        if (option === 'monthly') {
            dispatch(setBillingOption('Monthly Billing Program'));
            setSelectedOptionIndex(0);
        } else if (option === 'service') {
            dispatch(setBillingOption('Billed After Service'));
            setSelectedOptionIndex(1);
        } else if (option === 'annual') {
            dispatch(setBillingOption('Annual Billing'));
            setSelectedOptionIndex(2);
        } 
    }

    const addProposalToDatabase = async (isAgreed) => {
        await dispatch(createProposal({
            widget_id,
            program,
            frequency,
            billingFrequency,
            description: programSummary,
            responseId,
            proposalTemplateId,
            recurringPrice: quote.pricing[chosenBillingOption].billingAmount,
            setupFee: quote.pricing[chosenBillingOption].initial,
            isAgreed: isAgreed,
            name: name,
            email: email
        }))
    }

    return (
        <Frame>
            <ContentContainer>
                <PaneHeader
                    text="My Online Quote"
                    supportingText=""
                    emoji={'confetti'}
                />
                
                <div className="pricing-widget-pricing-container">
                <p className="pricing-widget-billing-toggler-label"><b>Billing Options</b></p>
                    <div className="pricing-widget-billing-toggler">
                        {billingOptions.map((option, index) => (
                            <div key={index} 
                                className={`pricing-widget-billing-toggler-button 
                                ${index === selectedOptionIndex ? 'pricing-widget-selected' : '' }`} 
                                onClick={() => handleBillingClick(option)}
                                style={{'border': index === selectedOptionIndex ? `1px solid ${hexSecondary}` : '1px solid #AAA6A6', 'boxShadow': index === selectedOptionIndex ? `0px 0px 2px 2px ${hexSecondary}` : null }}>
                                {option}
                            </div>
                        ))}
                    </div>
                    <br />
                    {chosenBillingOption === 'Annual Billing'
                        ? (<div>
                            <div>
                                <p className="pricing-widget-pricing-highlight">
                                    <b>1 Year:
                                        ${quote.pricing[chosenBillingOption].billingAmount} </b> 
                                        <span className="pricing-widget-pricing-strikethrough"> ${(quote.pricing[chosenBillingOption].billingAmount / .95).toFixed(2)} </span> <br />
                                    <span className="pricing-widget-discount">(5% Off When You Prepay!)</span>
                                </p>
                            </div>
                        </div>)
                        : (
                            <div>
                                <p className="pricing-widget-pricing-highlight">
                                    <b>1st Service:
                                        ${quote.pricing[chosenBillingOption].initial} </b>
                                        <span className="pricing-widget-pricing-strikethrough"> ${quote.pricing[chosenBillingOption].initial * 2} </span> <br />
                                    <span className="pricing-widget-discount">(50% Off Online Signups)</span>
                                </p>
                                <p className="pricing-widget-pricing-highlight"><b>Then: </b>${quote.pricing[chosenBillingOption].billingAmount} / {chosenBillingOption === 'Monthly Billing Program' ? 'month' : 'service'}</p>
                            </div>
                        )}

                    <p className="pricing-widget-pricing-summary">{programSummary}</p>
                    <br />
                </div>
                <SecondaryActionButton text="Email Me a Proposal" isDone={isProposalSent} onClick={handleProposalButton} />
                <SubmitButton text="Sign Up Now" onClick={handleSubmit} />
            </ContentContainer>
        </Frame>
    )
}

export default QuotePane;