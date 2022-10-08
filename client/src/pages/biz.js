import TwoColumnForm from "../components/layout/TwoColumnForm/TwoColumnForm";
import confetti from '../assets/confetti.png';
import SingleLineText from "../components/Inputs/SingleLineText";
import { useState } from "react";
import LargeButton from "../components/buttons/button";
import ColorPicker from "../components/Inputs/ColorPicker";

function Biz() {
    const [businessName, setBusinessName] = useState('');
    const [phone, setPhone] = useState('');
    const [brandPrimary, setBrandPrimary] = useState('#6A77D9');
    const [brandBackground, setBrandBackground] = useState('')

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
                state={businessName}
                setState={setBusinessName}
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
                state={brandPrimary}
                setState={setBrandPrimary}
            />
            <ColorPicker
                name="brand-background"
                label="Your Brand's Background Color"
                state={brandBackground}
                setState={setBrandBackground}
            />
            <LargeButton size={5} isPrimary={true}>Next</LargeButton>
        </TwoColumnForm>
    )
}

export default Biz;