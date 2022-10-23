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

    const checkIsValid = () => {
        let error = 'No Errors';
        if(name.length <= 5 || name.length > 80) {
            error = 'Program name must be between 5 and 80 characters long'
        } else if (description.length < 10 || description.length > 200) {
            error = 'Program description must be between 10 and 200 characeters long'
        } else if (targets.length <= 0) {
            error = 'Please add one or more targets. Make sure you click the add button to add them to your widget!'
        } else if (benefitOne.length < 5 || benefitTwo.length > 150) {
            error = 'Please make sure benefit 1 is between 5 and 150 characters long';
        } else if (benefitTwo.length < 5 || benefitTwo.length > 150) {
            error = 'Please make sure benefit 2 is between 5 and 150 characters long';
        } else if (benefitThree.length < 5 || benefitThree.length > 150) {
            error = 'Please make sure benefit 3 is between 5 and 150 characters long';
        } else if (!['Bimonthly', 'Quarterly', 'Monthly', 'One Time'].includes(frequency)) {
            error = 'Please select a service frequency'
        } else if (!billing.some(option => option.allowed)) {
            error = 'Please check at least one of the billing options'
        }

        return { isValid: error === 'No Errors' ? true : false, error }
    }

    const handleSubmit = async () => {
        //ensure that all of the information is valid
        const { isValid, error } = checkIsValid()
        if(isValid) {
            try {
                const response = await dispatch(updateWidgetDetails({widgetId}))
                dispatch(updateConfigTargets(targets))
                navigate(`/widget-pricing/${widgetId}/edit`);
            } catch (err) {
                console.log(err);
            }
        } else {
            alert(error)
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