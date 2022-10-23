import SingleLineText from "../components/Inputs/SingleLineText";
import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";
import { useDispatch, useSelector } from "react-redux";
import { getWidgetByIdReload, removeTarget, seelctBilling, selectBenefitOne, selectBenefitThree, selectBenefitTwo, selectFrequency, selectIsWidgetLoaded, selectProgramDescription, selectProgramName, selectTargets, toggleBilling, updateConfigTargets, updateDraft, updateWidgetDetails } from "../redux/widgetSlice";
import MultiLineText from "../components/Inputs/MultiLineText";
import TagBuilder from "../components/Inputs/TagBuilder";
import SingleSelect from "../components/Inputs/SingleSelect";
import CheckBoxGroup from "../components/Inputs/CheckBoxGroup";
import example from '../assets/widget-tile-ex.png'
import LargeButton from "../components/buttons/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function Details() {
    const name = useSelector(selectProgramName);
    const description = useSelector(selectProgramDescription);
    const targets = useSelector(selectTargets);
    const benefitOne = useSelector(selectBenefitOne);
    const benefitTwo = useSelector(selectBenefitTwo);
    const benefitThree = useSelector(selectBenefitThree);
    const frequency = useSelector(selectFrequency);
    const billing = useSelector(seelctBilling);
    const isWidgetLoaded = useSelector(selectIsWidgetLoaded)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { widgetId } = useParams()

    const consolidateArrayandOptions = (options, arr, propToSearch, propToChange) => {
        const output = [];
        options.forEach(option => {
            if(arr.includes(option[propToSearch])) {
                output.push({
                    ...option,
                    [propToChange]: true
                })
            } else {
                output.push(option)
            }
        })
        return output;
    }

    useEffect(() => {
        //load the current widget's data into the widget
        (async () => {
            try {
                if(!isWidgetLoaded) {
                    const currentWidget = await dispatch(getWidgetByIdReload(widgetId))
                    const details = currentWidget.payload.data.details;
                    const { targets, benefits } = currentWidget.payload.data;
                    const billingFrequency = consolidateArrayandOptions(billing, details.billing_frequency, 'type', 'allowed');

                    dispatch(updateDraft({
                        name: details.program,
                        programDescription: details.short_description,
                        targets: targets,
                        benefitOne: benefits[0],
                        benefitTwo: benefits[1],
                        benefitThree: benefits[2],
                        frequency: details.frequency,
                        billing: billingFrequency
                    }))
                }
            } catch (err) {
                console.log(err)
            }
        })();
    }, [])

    const handleSubmit = async () => {
        try {
            const response = await dispatch(updateWidgetDetails({widgetId}))
            dispatch(updateConfigTargets(targets))
            navigate(`/widget-pricing/${widgetId}/edit`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <ApplicationMainLayout header="Widget Information" isDataLoading={!isWidgetLoaded}>
                <br />
                <div className="flex flex-wrap">
                    <div className="w-1/2 px-8">
                        <SingleLineText
                            name="program-name"
                            label="Program Name"
                            type="text"
                            helper="Gold Program"
                            size="medium"
                            state={name}
                            setState={(e) => dispatch(updateDraft({name: e}))}
                        />
                        <MultiLineText
                            name="program-description"
                            label="Program Description"
                            type="text"
                            helper="Sell the benefits of your program here. Max 250 characters."
                            state={description}
                            length={250}
                            setState={(e) => dispatch(updateDraft({programDescription: e}))}
                        />
                        <TagBuilder
                            name="targets"
                            label="Possible Targets"
                            type="text"
                            helper="Add a New Target Here"
                            state={targets}
                            setState={(e) => dispatch(updateDraft({targets: [...targets, e]}))}
                            removeTag={(e) => dispatch(removeTarget(e))}
                        />
                        <MultiLineText
                            name="benefit-one"
                            label="Benefit 1"
                            type="text"
                            helper="Write a clear benefit for your service tile."
                            size="short"
                            length={125}
                            state={benefitOne}
                            setState={(e) => dispatch(updateDraft({benefitOne: e}))}
                        />
                        <MultiLineText
                            name="benefit-twp"
                            label="Benefit 2"
                            type="text"
                            helper="Write a clear benefit for your service tile."
                            size="short"
                            length={125}
                            state={benefitTwo}
                            setState={(e) => dispatch(updateDraft({benefitTwo: e}))}
                        />
                        <MultiLineText
                            name="benefit-three"
                            label="Benefit 3"
                            type="text"
                            helper="Write a clear benefit for your service tile."
                            size="short"
                            length={125}
                            state={benefitThree}
                            setState={(e) => dispatch(updateDraft({benefitThree: e}))}
                        />
                        <SingleSelect 
                            name="frequency"
                            label="Service Frequency"
                            size="medium"
                            state={frequency}
                            setState={(e) => dispatch(updateDraft({frequency: e}))}
                            options={['Bimonthly', 'Quarterly', 'Monthly', 'One Time']}
                        />
                        <CheckBoxGroup
                            name="billing"
                            label="Allowed Billing Options"
                            state={billing}
                            setState={(e) => dispatch(toggleBilling(e))}
                        />
                        <LargeButton handleClick={() => handleSubmit()} size={0} className="justify-center">Save</LargeButton>
                    </div>
                    <div className="w-1/2 flex justify-center flex-wrap content-start">
                        <p className="text-center text-2xl w-full mb-8 font-semibold font-poppins">DEMO</p>
                        <img src={example} className="w-96 h-fit" />
                    </div>
                </div>
            </ApplicationMainLayout>
        </div>
    )
}

export default Details;