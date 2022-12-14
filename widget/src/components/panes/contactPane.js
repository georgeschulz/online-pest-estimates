import Frame from "../layout/frame";
import ContentContainer from "../layout/contentContainer";
import SubmitButton from "../buttons/submitButton";
import PaneHeader from "../layout/paneHeader";
import SingleLineText from "../form/singleLineText";
import { useSelector, useDispatch } from "react-redux";
import { selectName, selectEmail, selectPhone, setName, setEmail, setPhone, createContact } from "../../redux/contactSlice";
import { setPane } from "../../redux/paneSlice";
import { selectWidgetId } from "../../redux/configSlice";

function ContactPane() {
    const name = useSelector(selectName);
    const email = useSelector(selectEmail);
    const phone = useSelector(selectPhone);
    const widgetId = useSelector(selectWidgetId);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        (async () => {
            try {
                await dispatch(createContact({ name, email, phone, widgetId }));
                dispatch(setPane('calculator'));
            } catch (e) {
                console.log(e);
            }
        })();
        
    }

    return (
        <Frame>
            <ContentContainer>
                <PaneHeader
                    text="My Online Quote"
                    supportingText="Fill out your information below so we can email a copy of your
                estimate"
                    emoji={'clap'}
                />
                <form className="pricing-widget-form flex-row">
                    <SingleLineText
                        name="name"
                        type="text"
                        label="Name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => dispatch(setName(e.target.value))}
                    />
                    <SingleLineText
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="you@youremail.com"
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                    />
                    <SingleLineText
                        name="phone"
                        type="tel"
                        label="Phone"
                        placeholder="555-555-5555"
                        value={phone}
                        onChange={(e) => dispatch(setPhone(e.target.value))}
                    />
                </form>
                <SubmitButton text="Send My Quote" onClick={() => handleSubmit()}/>
            </ContentContainer>
        </Frame>
    )
}

export default ContactPane;