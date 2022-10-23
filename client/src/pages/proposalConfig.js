import TagBuilder from "../components/Inputs/TagBuilder";
import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";
import { useDispatch, useSelector } from "react-redux";
import { removeCovered, removeNotCovered, removeTarget, removeTargetFull, seelctIsProposalLoading, selectCovered, selectIsWidgetLoaded, selectIsWidgetLoading, selectLegal, selectNotCovered, selectTargetFull, updateDraft, updateWidgetProposalConfig } from "../redux/widgetSlice";
import { useNavigate, useParams } from "react-router-dom";
import x from '../assets/x.png';
import MultiLineText from "../components/Inputs/MultiLineText";
import LargeButton from "../components/buttons/button";
import { useEffect } from "react";
import { getWidgetByIdReload } from "../redux/widgetSlice";
import { publishWidget } from "../redux/widgetSlice";
import { useState } from "react";
import UpdateMessage from "../components/notifications/UpdateMessage";

function ProposalConfig() {
    const { widgetId } = useParams(); 

    const covered = useSelector(selectCovered);
    const notCovered = useSelector(selectNotCovered);
    const targetFull = useSelector(selectTargetFull);
    const legal = useSelector(selectLegal);
    const isWidgetLoaded = useSelector(selectIsWidgetLoaded)
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkIsValid = () => {
        let error = 'No Errors';
        if(covered.length <= 0) {
            error = 'Please include at least 1 feature to highlight'
        } else if (notCovered.length <= 0) {
            error = 'Please include at least 1 feature to highlight is not covered'
        } else if (legal.length <= 10) {
            error = 'Please make sure to include your legal information'
        } else if (targetFull.length <= 0) {
            error = 'Please include at least one covered target to include on your proposal'
        }

        return { isValid: error === 'No Errors' ? true : false, error }
    }

    const handleSubmit = async () => {
        const { isValid, error } = checkIsValid()
        if(isValid) {
            try {
                dispatch(updateWidgetProposalConfig({widgetId}))
                dispatch(publishWidget(widgetId))
                navigate(`/widget-confirmation/${widgetId}/edit`)
            } catch (err) {
                console.log(err);
            }
        } else {
            setShowError(true)
            setErrorMessage(error);
            window.scrollTo(0, 0)
        }
    }

    useEffect(() => {
        (async () => {
            //load current widget settings for editing
            try {
                if(!isWidgetLoaded) {
                    const currentWidget = await dispatch(getWidgetByIdReload(widgetId));
                    const { proposal } = currentWidget.payload.data;
                    
                    const covered = proposal
                        .highlightedFeatures.filter(feature => feature[1])
                        .map(item => item[0]);
                    const notCovered = proposal
                        .highlightedFeatures.filter(feature => !feature[1])
                        .map(item => item[0]);
                    
                    dispatch(updateDraft({
                        covered: covered,
                        notCovered: notCovered,
                        targetFull: proposal.covered_pests,
                        legal: proposal.legal
                    }))
                }
            } catch (err) {
                console.log(err)
            }
        })();
    }, [])

    return (
        <div>
            <ApplicationMainLayout header="Proposal Setup" isDataLoading={!isWidgetLoaded}>
                <br />
                <UpdateMessage message={`${errorMessage}`} isVisible={showError} dismissReducer={() => setShowError(false)} />
                <TagBuilder
                    name="covered"
                    label="What things do you want to highlight ARE covered?"
                    type="text"
                    helper="Add a feature you want to highlight that is covered"
                    state={covered}
                    setState={(e) => dispatch(updateDraft({covered: [...covered, e]}))}
                    removeTag={(e) => dispatch(removeCovered(e))}
                    tagStyle="list"
                />
                <TagBuilder
                    name="not-covered"
                    label="What things do you want to highlight are NOT covered?"
                    type="text"
                    helper="Add a feature you want to highlight is not covered."
                    state={notCovered}
                    setState={(e) => dispatch(updateDraft({notCovered: [...notCovered, e]}))}
                    removeTag={(e) => dispatch(removeNotCovered(e))}
                    tagStyle="list"
                    icon={x}
                />
                <TagBuilder
                    name="full-target-list"
                    label="Full list of covered pests"
                    type="text"
                    helper="Type a New Target Here then Click Add"
                    state={targetFull}
                    setState={(e) => dispatch(updateDraft({targetFull: [...targetFull, e]}))}
                    removeTag={(e) => dispatch(removeTargetFull(e))}
                    tagStyle="tag"
                    icon={x}
                />
                <MultiLineText
                    name="legal"
                    label="Copy and Paste Legal Language"
                    type="text"
                    helper="Please provide documentation of your legal terms"
                    size="tall"
                    state={legal}
                    setState={(e) => dispatch(updateDraft({legal: e}))}
                />
                <LargeButton size={0} className="justify-center" handleClick={() => handleSubmit()}>
                    Save
                </LargeButton>
            </ApplicationMainLayout>
        </div>
    )
}

export default ProposalConfig;