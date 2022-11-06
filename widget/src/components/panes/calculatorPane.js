import Frame from "../layout/frame"
import PaneHeader from "../layout/paneHeader";
import Rocket from '../../assets/rocket.png'
import ContentContainer from "../layout/contentContainer";
import SubmitButton from "../buttons/submitButton";
import { useDispatch, useSelector } from "react-redux";
import { selectInputConfigs } from "../../redux/configSlice";
import { setPane } from "../../redux/paneSlice";
import DynamicForm from "../dynamicForm/dynamicForm";
import { submitForm } from "../../redux/configSlice";

function CalculatorPane() {
    const dispatch = useDispatch();
    const inputConfigs = useSelector(selectInputConfigs);

    const handleSubmit = () => {
        dispatch(submitForm());
        dispatch(setPane('quote'));
    }

    return (
        <Frame>
            <ContentContainer>
                <PaneHeader
                    text="Tell Us About You"
                    supportingText=""
                    emoji={'rocket'}
                />
                <DynamicForm />
                <SubmitButton text="Finish" onClick={handleSubmit} />
            </ContentContainer>
        </Frame>
    )
}

export default CalculatorPane;