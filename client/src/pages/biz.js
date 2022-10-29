import TwoColumnForm from "../components/layout/TwoColumnForm/TwoColumnForm";
import confetti from '../assets/confetti.png';
import SingleLineText from "../components/Inputs/SingleLineText";
import { useState } from "react";
import LargeButton from "../components/buttons/button";
import ColorPicker from "../components/Inputs/ColorPicker";
import { useDispatch, useSelector } from "react-redux";
import { addBusinessInfo, getLoggedInUser, selectHasBusinessDetails } from "../redux/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSession } from "../redux/billingSlice";

function Biz() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [hexPrimary, setHexPrimary] = useState('#6A77D9');
    const [hexSecondary, setHexSecondary] = useState('')
    
    const dispatch = useDispatch();
    const hasBusinessDetails = useSelector(selectHasBusinessDetails)
    const naviate = useNavigate();

    useEffect(() => {
        (async () => {
            if(hasBusinessDetails) {
                const url = await dispatch(createSession())
                window.location.href = url.payload.data;
            }
        })();
    }, [dispatch, hasBusinessDetails])

    useEffect(() => {
        (async () => {
            await dispatch(getLoggedInUser())
        })();
    }, [])

    return (
        <TwoColumnForm 
            emoji={confetti}
            header="Your Business"
            instructions="Tell us a little bit about your business to create your widgets. Don't worry. You can change these settings later in the Settings tab. Click the color circles to open the color picker."
        >
            <SingleLineText
                name="bussiness-name"
                label="Business Name"
                type="text"
                state={name}
                setState={setName}
                helper="ABC Pest"
            />
            <SingleLineText
                name="phone"
                label="Phone Number"
                type="text"
                state={phone}
                setState={setPhone}
                helper='111-111-1111'
            />
            <ColorPicker
                name="brand-primary"
                label="Your Brand's Primary Color"
                state={hexPrimary}
                setState={setHexPrimary}
            />
            <ColorPicker
                name="brand-background"
                label="Your Brand's Background Color"
                state={hexSecondary}
                setState={setHexSecondary}
            />
            <LargeButton size={5} isPrimary={true} handleClick={() => dispatch(addBusinessInfo({name, phone, hexPrimary: hexPrimary.hex.slice(1,7), hexSecondary: hexSecondary.hex.slice(1,7)}))}>Next</LargeButton>
        </TwoColumnForm>
    )
}

export default Biz;