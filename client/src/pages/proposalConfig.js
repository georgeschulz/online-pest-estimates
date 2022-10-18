import TagBuilder from "../components/Inputs/TagBuilder";
import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";
import { useDispatch, useSelector } from "react-redux";
import { removeCovered, removeNotCovered, removeTarget, removeTargetFull, selectCovered, selectIsWidgetLoaded, selectLegal, selectNotCovered, selectTargetFull, updateDraft, updateWidgetProposalConfig } from "../redux/widgetSlice";
import { useNavigate, useParams } from "react-router-dom";
import x from '../assets/x.png';
import MultiLineText from "../components/Inputs/MultiLineText";
import LargeButton from "../components/buttons/button";
import { useEffect } from "react";
import { getWidgetByIdReload } from "../redux/widgetSlice";

function ProposalConfig() {
    const { widgetId } = useParams(); 

    const covered = useSelector(selectCovered);
    const notCovered = useSelector(selectNotCovered);
    const targetFull = useSelector(selectTargetFull);
    const legal = useSelector(selectLegal);
    const isWidgetLoaded = useSelector(selectIsWidgetLoaded)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            dispatch(updateWidgetProposalConfig({widgetId}))
            navigate(`/widget-confirmation/${widgetId}/edit`)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                if(!isWidgetLoaded) {
                    dispatch(getWidgetByIdReload(widgetId))
                }
            } catch (err) {
                console.log(err)
            }
        })();
    }, [])

    return (
        <div>
            <ApplicationMainLayout header="Proposal Setup">
                <br />
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