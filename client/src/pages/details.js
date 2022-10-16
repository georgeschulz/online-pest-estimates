import SingleLineText from "../components/Inputs/SingleLineText";
import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";
import { useDispatch, useSelector } from "react-redux";
import { seelctBilling, selectBenefitOne, selectBenefitThree, selectBenefitTwo, selectFrequency, selectProgramDescription, selectProgramName, selectTargets, updateDraft } from "../redux/widgetSlice";

function Details() {
    const name = useSelector(selectProgramName);
    const description = useSelector(selectProgramDescription);
    const targets = useSelector(selectTargets);
    const benefitOne = useSelector(selectBenefitOne);
    const benefitTwo = useSelector(selectBenefitTwo);
    const benefitThree = useSelector(selectBenefitThree);
    const frequency = useSelector(selectFrequency);
    const billing = useSelector(seelctBilling);

    const dispatch = useDispatch();

    return (
        <div>
            <ApplicationMainLayout header="Widget Information">
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
                    </div>
                    <div className="w-1/2">DEMO</div>
                </div>
            </ApplicationMainLayout>
        </div>
    )
}

export default Details;